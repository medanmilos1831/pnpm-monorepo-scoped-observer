import { ScrollInstance } from './ScrollInstance';

/**
 * Enum representing scroll direction.
 */
export enum DIRECTION {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

/**
 * Enum representing the scroll axis.
 */
export enum AXIS {
  X = 'x',
  Y = 'y',
}

/**
 * Type representing the configuration for the scroll container.
 */
export type scrollContainerType = {
  /**
   * Unique name identifier for this ScrollObserver instance.
   */
  name: string;

  /**
   * Callback fired on every scroll event.
   */
  onScroll?: (params: IScrollState) => void;

  /**
   * Callback fired when scroll starts.
   */
  onStart?: () => void;

  /**
   * Callback fired when scroll ends.
   */
  onEnd?: () => void;

  /**
   * Throttle duration (in milliseconds) for scroll events.
   */
  throttle?: number;

  /**
   * Scroll axis, either horizontal (x) or vertical (y).
   */
  axis?: `${AXIS}`;

  /**
   * Axis-specific scroll configuration.
   */
  config: {
    /**
     * Property used to determine scroll position (`scrollTop` or `scrollLeft`).
     */
    scrollPosition: keyof Pick<HTMLDivElement, 'scrollLeft' | 'scrollTop'>;

    /**
     * Client dimension property (`clientHeight` or `clientWidth`).
     */
    client: keyof Pick<HTMLDivElement, 'clientWidth' | 'clientHeight'>;

    /**
     * Scroll dimension property (`scrollHeight` or `scrollWidth`).
     */
    scroll: keyof Pick<HTMLDivElement, 'scrollHeight' | 'scrollWidth'>;

    /**
     * Function to calculate scroll direction based on current and previous position.
     */
    direction: (position: number, scrollPosition: number) => DIRECTION;

    /**
     * Overflow property of the scroll container (`overflowY` or `overflowX`).
     */
    overflow: 'overflowX' | 'overflowY';
  };

  /**
   * Optional IntersectionObserver configuration for waypoint detection.
   */
  intersectionObserverInit?: Omit<IntersectionObserverInit, 'root'>;
};

/**
 * Object passed to onScroll callback containing current scroll state.
 */
export interface IScrollState {
  /**
   * Indicates if the container is currently being scrolled.
   */
  isScrolling: boolean;

  /**
   * Current scroll position.
   */
  scrollPosition: number;

  /**
   * Visible size of the scroll container (height or width).
   */
  client: number;

  /**
   * Direction of scroll movement.
   */
  direction: DIRECTION;

  /**
   * Progress of scrolling as a value between 0 and 1.
   */
  scrollProgress: number;
}

/**
 * Global identifier for event scoping in ScrollObserver system.
 */
export const EVENT_MANAGER_SCROLL_OBSERVER = 'scrollObserver';

/**
 * Axis-based configuration options for scroll behavior.
 */
export type axisOptionsConfigType = Record<
  AXIS,
  {
    /**
     * Property used to determine scroll position.
     */
    scrollPosition: keyof Pick<HTMLDivElement, 'scrollLeft' | 'scrollTop'>;

    /**
     * Property for visible size of the container.
     */
    client: keyof Pick<HTMLDivElement, 'clientWidth' | 'clientHeight'>;

    /**
     * Property for full scrollable size.
     */
    scroll: keyof Pick<HTMLDivElement, 'scrollWidth' | 'scrollHeight'>;

    /**
     * Function that calculates scroll direction.
     */
    direction: (position: number, scrollPosition: number) => DIRECTION;

    /**
     * CSS overflow property relevant to axis.
     */
    overflow: 'overflowX' | 'overflowY';
  }
>;

/**
 * Props for defining a waypoint inside a scrollable container.
 */
export type waypoint = {
  /**
   * Callback triggered when the waypoint enters the viewport.
   */
  onEnter?: () => void;

  /**
   * Callback triggered when the waypoint leaves the viewport.
   */
  onLeave?: () => void;

  /**
   * General callback triggered on intersection change,
   * provides both visibility status and the raw observer entry.
   */
  status?: (params: {
    /**
     * Indicates whether the element is entering or leaving the viewport.
     */
    visibilityStatus: 'enter' | 'leave';

    /**
     * The IntersectionObserver entry for the element.
     */
    observerEntry: IntersectionObserverEntry;
  }) => void;
};

export interface IScrollObserver {
  registry: Map<string, ScrollInstance>;
  clearRegisty: () => void;
}
