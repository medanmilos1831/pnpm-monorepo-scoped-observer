import { useRef, useEffect } from "react";
import { scrollService } from "../service/ScrollService";
import { AXIS, EVENT_MANAGER_SCROLL_OBSERVER } from "../types";

/**
 * Custom React hook that subscribes to scroll-to events for a given scroll container
 * and allows programmatic scrolling via `scrollService.scrollTo`.
 *
 * It listens for events named `${name}_scrollTo` dispatched on the `EVENT_MANAGER_SCROLL_OBSERVER` scope.
 * When such an event is received, it scrolls the associated container to the specified position
 * along the given axis (`x` or `y`) using the specified scroll behavior.
 *
 * @param {string} name - Unique identifier for the scroll container. Must match the identifier used in `scrollService.scrollTo`.
 * @param {'x' | 'y'} axis - The scroll axis to respond to: 'x' for horizontal, 'y' for vertical.
 * @returns {React.RefObject<HTMLDivElement>} - A React ref to be attached to the scrollable container.
 *
 * @example
 * const containerRef = useSubscribe('myContainer', AXIS.Y);
 *
 * return <div ref={containerRef}>Scrollable Content</div>;
 *
 * // Later, scroll programmatically:
 * scrollService.scrollTo('myContainer', 200, 'smooth');
 */
const useSubscribe = (name: string, axis: `${AXIS}`) => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = scrollService.eventManager.subscribe({
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
      eventName: `${name}_scrollTo`,
      callback({ payload }) {
        if (container.current) {
          container.current.scrollTo({
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

  return container;
};

export { useSubscribe };
