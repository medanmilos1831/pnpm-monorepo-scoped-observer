import { CSSProperties } from 'react';
import { createEventManager } from 'scoped-observer';
import {
  AXIS,
  axisOptionsConfigType,
  DIRECTION,
  EVENT_MANAGER_SCROLL_OBSERVER,
  scrollContainerType,
} from '../types';

/**
 * ScrollService is a utility class responsible for handling scroll events, configuration,
 * styles, throttling, and scrolling programmatically. It supports both horizontal (X)
 * and vertical (Y) axes and dispatches scoped events for consumers to react to scroll behaviors.
 */
class ScrollService {
  /**
   * Event manager used for dispatching and subscribing to scroll-related events.
   */
  eventManager = createEventManager([
    {
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
    },
  ]);

  /**
   * Axis-specific configuration for scroll-related calculations and properties.
   */
  axisConfig: axisOptionsConfigType = {
    [AXIS.X]: {
      scrollPosition: 'scrollLeft',
      client: 'clientWidth',
      scroll: 'scrollWidth',
      direction: (prev, next) =>
        next > prev ? DIRECTION.RIGHT : DIRECTION.LEFT,
      overflow: 'overflowX',
    },
    [AXIS.Y]: {
      scrollPosition: 'scrollTop',
      client: 'clientHeight',
      scroll: 'scrollHeight',
      direction: (prev, next) => (next > prev ? DIRECTION.DOWN : DIRECTION.UP),
      overflow: 'overflowY',
    },
  };

  /**
   * Returns scroll container style for the given axis.
   *
   * @param {AXIS} axis - The axis (`x` or `y`) for scroll behavior.
   * @returns {CSSProperties} - CSS style for the scroll container.
   */
  containerStyle = (axis: `${AXIS}`): CSSProperties => {
    return {
      height: '100%',
      position: 'relative',
      [this.axisConfig[axis].overflow]: 'auto',
    };
  };

  /**
   * Returns style for the inner container to simulate scroll space.
   *
   * @param {AXIS} axis - The axis (`x` or `y`) for scroll behavior.
   * @returns {CSSProperties} - CSS style for the scroll inner content wrapper.
   */
  innerContainerStyle = (axis: `${AXIS}`): CSSProperties => ({
    height: axis === AXIS.Y ? '100%' : 'auto',
    width: axis === AXIS.X ? 'max-content' : '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  });

  /**
   * Creates a throttled version of a function.
   *
   * @param {Function} fn - Function to throttle.
   * @param {number} delay - Throttle delay in milliseconds.
   * @returns {Function} - Throttled function.
   */
  throttle = (fn: (...args: any[]) => void, delay: number) => {
    let time = Date.now();
    return (e: any) => {
      if (time + delay - Date.now() <= 0) {
        fn(e);
        time = Date.now();
      }
    };
  };

  /**
   * Returns a scroll event handler which:
   * - Calculates direction, progress, and client metrics
   * - Calls onScroll, onStart, and onEnd if provided
   * - Dispatches scrolling events (throttled if needed)
   *
   * @param {scrollContainerType} options - Scroll configuration options.
   * @returns {Function} - Scroll event handler.
   */
  onScroll = ({
    name,
    onScroll,
    onStart,
    onEnd,
    throttle = 0,
    axis,
    config,
  }: scrollContainerType) => {
    let position = 0;
    let isScrollingTimeout: ReturnType<typeof setTimeout> | null = null;

    const handler = (e: any) => {
      const target = e.target as HTMLDivElement;

      const scrollPosition = target[config.scrollPosition];
      const client = target[config.client];
      const scroll = target[config.scroll];
      const direction = config.direction(position, scrollPosition);

      const scrollProgress = (scrollPosition / (scroll - client)) * 100;

      const payload = {
        isScrolling: true,
        scrollPosition,
        client,
        direction,
        scrollProgress,
      };

      this.eventManager.dispatch({
        scope: EVENT_MANAGER_SCROLL_OBSERVER,
        eventName: `${name}_scrolling`,
        payload,
      });

      if (isScrollingTimeout) clearTimeout(isScrollingTimeout);
      isScrollingTimeout = setTimeout(() => {
        this.eventManager.dispatch({
          scope: EVENT_MANAGER_SCROLL_OBSERVER,
          eventName: `${name}_scrolling`,
          payload: {
            isScrolling: false,
          },
        });
      }, 200);

      if (onScroll) onScroll(payload);

      position = scrollPosition;

      if (scrollPosition === 0 && onStart) {
        onStart();
      }

      if (scrollPosition + client >= scroll - 1 && onEnd) {
        onEnd();
      }
    };

    return throttle > 0 ? this.throttle(handler, throttle) : handler;
  };

  /**
   * Programmatically scrolls to a specific position using event dispatch.
   *
   * @param {string} name - The name of the scroll container to scroll.
   * @param {number} position - The scroll position (top or left) to scroll to.
   * @param {ScrollToOptions['behavior']} behavior - The scroll behavior ('auto', 'smooth', etc.).
   */
  scrollTo = (
    name: string,
    position: number,
    behavior: ScrollToOptions['behavior']
  ) => {
    this.eventManager.dispatch({
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
      eventName: `${name}_scrollTo`,
      payload: {
        position,
        behavior,
      },
    });
  };
}

const scrollService = new ScrollService();

export { scrollService };
