import {
  PropsWithChildren,
  useRef,
  useContext,
  useState,
  useEffect,
  createContext,
  useLayoutEffect,
} from 'react';
import {
  AXIS,
  scrollContainerType,
  EVENT_MANAGER_SCROLL_OBSERVER,
  waypoint,
} from './types';
import { ScrollContext } from './ScrollProvider';
import { ScrollInstance } from './ScrollInstance';

const ScrollContainerContext = createContext<
  | {
      scrollService: ScrollInstance;
      waypointObserver: () => IntersectionObserver | null;
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
}: PropsWithChildren<Omit<scrollContainerType, 'config'>>) => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error(
      '<ScrollContainer> must be used within a <ScrollProvider>.'
    );
  }

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const waypointObserverRef = useRef<IntersectionObserver | null>(null);

  const [{ scrollService }] = useState(() => {
    const service = context.setScroll(name);
    if (!service) {
      throw new Error(`Scroll service not found for name: ${name}`);
    }
    return { scrollService: service };
  });

  useLayoutEffect(() => {
    if (intersectionObserverInit && scrollContainerRef.current) {
      waypointObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            scrollService.eventManager.dispatch({
              scope: EVENT_MANAGER_SCROLL_OBSERVER,
              eventName: `waypointObserver`,
              payload: entry,
            });
          });
        },
        {
          root: scrollContainerRef.current,
          ...intersectionObserverInit,
        }
      );
    }

    return () => {
      if (waypointObserverRef.current && scrollContainerRef.current) {
        waypointObserverRef.current.disconnect();
      }
    };
  }, [intersectionObserverInit, scrollService]);

  useEffect(() => {
    const unsubscribe = scrollService.eventManager.subscribe({
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
      eventName: `scrollTo`,
      callback({ payload }: any) {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            [axis === AXIS.X ? 'left' : 'top']: payload.position,
            behavior: payload.behavior,
          });
        }
      },
    });

    return () => {
      unsubscribe();
    };
  }, [axis, scrollService]);

  useEffect(() => {
    return () => {
      context.removeScroll(name);
    };
  }, [context, name]);

  return (
    <div
      style={scrollService.containerStyle(axis)}
      onScroll={scrollService.onScroll({
        name,
        onScroll,
        onStart,
        onEnd,
        throttle,
        axis,
        config: scrollService.axisConfig[axis],
      })}
      ref={scrollContainerRef}
    >
      <div style={scrollService.innerContainerStyle(axis)}>
        <ScrollContainerContext.Provider
          value={{
            scrollService,
            waypointObserver: () => waypointObserverRef.current,
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
  const context = useContext(ScrollContainerContext);
  if (!context) {
    throw new Error(
      '<ScrollWaypoint> must be used within a <ScrollContainer>.'
    );
  }
  const { scrollService, waypointObserver } = context;

  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = scrollService.eventManager.subscribe({
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
      eventName: `waypointObserver`,
      callback({ payload }: { payload: IntersectionObserverEntry }) {
        if (payload.target === elementRef.current && status) {
          status({
            visibilityStatus: payload.isIntersecting ? 'enter' : 'leave',
            observerEntry: payload,
          });
        }
      },
    });
    return () => {
      unsubscribe();
    };
  }, [scrollService, status]);

  useEffect(() => {
    const observer = waypointObserver?.();
    if (!elementRef.current || !observer) return;

    observer.observe(elementRef.current);
    return () => {
      observer.unobserve(elementRef.current!);
    };
  }, [waypointObserver]);

  return <div ref={elementRef}>{children}</div>;
};

const useScroll = () => {
  const scrollContainerContext = useContext(ScrollContainerContext);

  if (!scrollContainerContext) {
    throw new Error('useScroll must be used inside <ScrollContainer>.');
  }

  const service = scrollContainerContext.scrollService;
  const [state, setState] = useState(() => {
    return service.state;
  });

  useEffect(() => {
    const unsubscribe = service.eventManager.subscribe({
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
      eventName: `scrolling`,
      callback({ payload }: { payload: typeof state }) {
        setState(payload);
      },
    });
    return () => {
      unsubscribe();
    };
  }, [service]);

  return state;
};

export { ScrollContainer, useScroll };
