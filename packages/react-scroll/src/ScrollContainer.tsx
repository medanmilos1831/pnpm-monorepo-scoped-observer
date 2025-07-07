import {
  PropsWithChildren,
  useRef,
  useContext,
  useState,
  useEffect,
  createContext,
  useLayoutEffect,
} from "react";
import {
  AXIS,
  scrollContainerType,
  EVENT_MANAGER_SCROLL_OBSERVER,
  waypoint,
} from "./types";
import { ScrollContext } from "./ScrollProvider";
import { ScrollEntity } from "./ScrollEntity";

const ScrollContainerContext = createContext<
  | {
      scrollService: ScrollEntity;
      waypointObserver: () => IntersectionObserver | undefined;
      name: string;
    }
  | undefined
>(undefined);

const ScrollContainer = ({
  name,
  children,
  onScroll,
  onStart,
  onEnd,
  throttle,
  axis = AXIS.Y,
  intersectionObserverInit,
}: PropsWithChildren<Omit<scrollContainerType, "config">>) => {
  const context = useContext(ScrollContext)!;
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const waypointObserverRef = useRef<IntersectionObserver | null>(null);

  const [{ scrollService }] = useState(() => {
    let scrollService = context.setScroll(name)!;

    return {
      scrollService,
    };
  });
  useLayoutEffect(() => {
    if (intersectionObserverInit && scrollContainer.current) {
      waypointObserverRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            scrollService!.eventManager.dispatch({
              scope: EVENT_MANAGER_SCROLL_OBSERVER,
              eventName: `waypointObserver`,
              payload: entry,
            });
          }
        },
        {
          root: scrollContainer.current,
          ...intersectionObserverInit,
        }
      );
    }
  }, []);

  useEffect(() => {
    const unsubscribe = scrollService.eventManager.subscribe({
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
      eventName: `scrollTo`,
      callback({ payload }: any) {
        if (scrollContainer.current) {
          scrollContainer.current.scrollTo({
            [axis === AXIS.X ? "left" : "top"]: payload.position,
            behavior: payload.behavior,
          });
        }
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    return () => {
      context.removeScroll(name);
    };
  });

  return (
    <div
      style={scrollService!.containerStyle(axis)}
      onScroll={scrollService!.onScroll({
        name,
        onScroll,
        onStart,
        onEnd,
        throttle,
        axis,
        config: scrollService.axisConfig[axis],
      })}
      ref={scrollContainer}
    >
      <div style={scrollService!.innerContainerStyle(axis)}>
        <ScrollContainerContext.Provider
          value={{
            scrollService,
            waypointObserver: () => waypointObserverRef.current!,
            name,
          }}
        >
          {children}
        </ScrollContainerContext.Provider>
      </div>
    </div>
  );
};

ScrollContainer.ScrollWaypoint = ({
  children,
  status,
}: PropsWithChildren<waypoint>) => {
  const { scrollService, waypointObserver } = useContext(
    ScrollContainerContext
  )!;
  const element = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const unsubscibe = scrollService.eventManager.subscribe({
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
      eventName: `waypointObserver`,
      callback({ payload }: { payload: IntersectionObserverEntry }) {
        if (payload.target === element.current && status) {
          status({
            visibilityStatus: payload.isIntersecting ? "enter" : "leave",
            observerEntry: payload,
          });
        }
      },
    });
    return () => {
      unsubscibe();
    };
  }, []);
  useEffect(() => {
    if (!element.current || !waypointObserver) return;

    waypointObserver()!.observe(element.current);
    return () => {
      waypointObserver()!.unobserve(element.current!);
    };
  }, []);
  return <div ref={element}>{children}</div>;
};

const useScroll = (name?: string) => {
  const scrollContext = useContext(ScrollContext);
  const scrollContainerContext = useContext(ScrollContainerContext);
  if (!scrollContext) {
    throw new Error(
      "useScroll must be used inside <ScrollProvider>. " +
        "Wrap your app (or part of it) with <ScrollProvider scroll={...}>."
    );
  }

  if (!name && !scrollContainerContext) {
    throw new Error(
      'useScroll without a "name" parameter must be used inside <ScrollContainer>. ' +
        'Either give useScroll a container name (useScroll("myId")) ' +
        "or call it inside the corresponding <ScrollContainer> tree."
    );
  }

  const service = !name
    ? scrollContainerContext!.scrollService
    : scrollContext.getScroll(name);
  const [state, setState] = useState(() => {
    return service!.props;
  });
  useEffect(() => {
    const unsubscibe = service!.eventManager.subscribe({
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
      eventName: `scrolling`,
      callback({ payload }: { payload: typeof state }) {
        setState((prev: any) => {
          return {
            ...prev,
            ...payload,
          };
        });
      },
    });
    return () => {
      unsubscibe();
    };
  }, []);
  return state;
};

export { ScrollContainer, useScroll };
