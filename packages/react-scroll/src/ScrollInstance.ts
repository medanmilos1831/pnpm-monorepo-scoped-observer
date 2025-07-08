import { CSSProperties } from "react";
import {
  AXIS,
  axisOptionsConfigType,
  DIRECTION,
  EVENT_MANAGER_SCROLL_OBSERVER,
  scrollContainerType,
  IScrollState,
} from "./types";
import { createScopedObserver } from "@scoped-observer/core";

export class ScrollInstance {
  /**
   * Event manager used for dispatching and subscribing to scroll-related events.
   */
  eventManager = createScopedObserver([
    {
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
    },
  ]);

  state: IScrollState = {
    isScrolling: false,
    scrollPosition: 0,
    client: 0,
    direction: DIRECTION.DOWN,
    scrollProgress: 0,
  };

  /**
   * Axis-specific configuration for scroll-related calculations and properties.
   */
  axisConfig: axisOptionsConfigType = {
    [AXIS.X]: {
      scrollPosition: "scrollLeft",
      client: "clientWidth",
      scroll: "scrollWidth",
      direction: (prev, next) =>
        next > prev ? DIRECTION.RIGHT : DIRECTION.LEFT,
      overflow: "overflowX",
    },
    [AXIS.Y]: {
      scrollPosition: "scrollTop",
      client: "clientHeight",
      scroll: "scrollHeight",
      direction: (prev, next) => (next > prev ? DIRECTION.DOWN : DIRECTION.UP),
      overflow: "overflowY",
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
      height: "100%",
      position: "relative",
      [this.axisConfig[axis].overflow]: "auto",
    };
  };

  /**
   * Returns style for the inner container to simulate scroll space.
   *
   * @param {AXIS} axis - The axis (`x` or `y`) for scroll behavior.
   * @returns {CSSProperties} - CSS style for the scroll inner content wrapper.
   */
  innerContainerStyle = (axis: `${AXIS}`): CSSProperties => ({
    height: axis === AXIS.Y ? "100%" : "auto",
    width: axis === AXIS.X ? "max-content" : "100%",
    position: "absolute",
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
      this.state = {
        isScrolling: true,
        scrollPosition,
        client,
        direction,
        scrollProgress,
      };
      this.eventManager.dispatch({
        scope: EVENT_MANAGER_SCROLL_OBSERVER,
        eventName: "scrolling",
        payload: this.state,
      });

      if (isScrollingTimeout) clearTimeout(isScrollingTimeout);
      isScrollingTimeout = setTimeout(() => {
        this.state.isScrolling = false;
        this.eventManager.dispatch({
          scope: EVENT_MANAGER_SCROLL_OBSERVER,
          eventName: "scrolling",
          payload: this.state,
        });
      }, 200);

      if (onScroll) onScroll(this.state);

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

  scrollTo(position: number, behavior: ScrollToOptions["behavior"] = "smooth") {
    this.eventManager.dispatch({
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
      eventName: "scrollTo",
      payload: { position, behavior },
    });
  }
}
