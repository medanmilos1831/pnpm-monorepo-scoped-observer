import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useSubscribe } from './hooks/useSubscribe';
import { scrollService } from './service/ScrollService';

import {
  AXIS,
  EVENT_MANAGER_SCROLL_OBSERVER,
  scrollContainerType,
  waypoint,
} from './types';
import {
  ScrollObserverProvider,
  useScrollObserver,
} from './ScrollObserverProvider';

/**
 * `ScrollObserver` is a scrollable container component that tracks scrolling behavior,
 * provides contextual scroll state to children, and supports waypoint detection via IntersectionObserver.
 *
 * It wraps content inside a scrollable div, and uses a unique `name` to identify the container
 * and connect it with hooks or child waypoints.
 *
 * @component
 *
 * @param {string} name - Unique identifier for this scroll observer instance.
 * @param {React.ReactNode} children - Content inside the scrollable container.
 * @param {Function} [onScroll] - Callback triggered on every scroll event with scroll metrics.
 * @param {Function} [onStart] - Callback triggered when scrolling starts.
 * @param {Function} [onEnd] - Callback triggered when scrolling ends.
 * @param {number} [throttle] - Optional throttle value (in ms) to limit scroll event firing.
 * @param {'x' | 'y'} [axis='y'] - Axis to observe (`x` for horizontal or `y` for vertical).
 * @param {IntersectionObserverInit} [intersectionObserverInit] - Options for the internal IntersectionObserver.
 */
const ScrollObserver = ({
  name,
  children,
  onScroll,
  onStart,
  onEnd,
  throttle,
  axis = AXIS.Y,
  intersectionObserverInit,
}: PropsWithChildren<Omit<scrollContainerType, 'config'>>) => {
  let container = useSubscribe(name, axis);

  const [waypointObserver] = useState(() => {
    if (!intersectionObserverInit) return undefined;
    return new IntersectionObserver((entries) => {
      for (const entry of entries) {
        scrollService.eventManager.dispatch({
          scope: EVENT_MANAGER_SCROLL_OBSERVER,
          eventName: `${name}_waypointObserver`,
          payload: entry,
        });
      }
    }, intersectionObserverInit);
  });

  return (
    <ScrollObserverProvider name={name} waypointObserver={waypointObserver}>
      <div
        style={scrollService.containerStyle(axis)}
        ref={container}
        onScroll={scrollService.onScroll({
          name,
          onScroll,
          onStart,
          onEnd,
          throttle,
          axis,
          config: scrollService.axisConfig[axis],
        })}
      >
        <div style={scrollService.innerContainerStyle(axis)}>{children}</div>
      </div>
    </ScrollObserverProvider>
  );
};

/**
 * `ScrollWaypoint` is a child component of `ScrollObserver` that listens for visibility changes.
 *
 * It uses an IntersectionObserver (from context) to determine if it's visible within the scroll container
 * and fires the `status` callback accordingly when entering or leaving the viewport.
 *
 * @component
 *
 * @param {Function} [status] - Callback that receives visibility status and full observer entry.
 *                              Status will be `{ visibilityStatus: 'enter' | 'leave', observerEntry: IntersectionObserverEntry }`
 * @param {React.ReactNode} children - Content inside the waypoint div.
 */
ScrollObserver.ScrollWaypoint = ({
  children,
  status,
}: PropsWithChildren<waypoint>) => {
  const { name, waypointObserver } = useScrollObserver();
  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscibe = scrollService.eventManager.subscribe({
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
      eventName: `${name}_waypointObserver`,
      callback({ payload }: { payload: IntersectionObserverEntry }) {
        if (payload.target === element.current && status) {
          status({
            visibilityStatus: payload.isIntersecting ? 'enter' : 'leave',
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
    if (!waypointObserver || !element.current) return;
    waypointObserver.observe(element.current);
    return () => {
      waypointObserver.unobserve(element.current!);
    };
  }, []);

  return <div ref={element}>{children}</div>;
};

export { ScrollObserver };
