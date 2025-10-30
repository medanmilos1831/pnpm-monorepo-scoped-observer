import type { createCommands } from "./Store/Entity/createCommands";
import type { createScroll } from "./Store/Entity/createScoll";
import type { createState } from "./Store/Entity/StateManager/createState";
import type { createStateManager } from "./Store/Entity/StateManager/createStateManager";

export enum ScrolliumStoreEvents {
  CREATE_SCROLLIUM = "createScrollium",
}

export const SCROLLIUM_STORE_SCOPE = "scrollium-store" as const;
export const SCROLLIUM_SCOPE = "scrollium" as const;

export interface IEntity {
  stateManager: ReturnType<typeof createStateManager>;
  scroll: ReturnType<typeof createScroll>;
  commands: ReturnType<typeof createCommands>;
  mount: () => void;
  addEventListener: (
    eventName: `${ScrolliumPublicEventsType}`,
    callback: (payload: any) => void
  ) => () => void;
  cleanup: () => void;
  client: () => Pick<
    ReturnType<typeof createState>,
    | "id"
    | "scrollPosition"
    | "axis"
    | "direction"
    | "progress"
    | "isStart"
    | "isEnd"
    | "clientSize"
    | "scrollSize"
    | "isScrolling"
  >;
}

export enum ScrolliumPublicEvents {
  ON_SCROLL = "onScroll",
  ON_SCROLL_STOP = "onScrollStop",
}

export type ScrolliumPublicEventsType = `${ScrolliumPublicEvents}`;

export enum ScrolliumDirection {
  UP = "up",
  DOWN = "down",
  NONE = "none",
  LEFT = "left",
  RIGHT = "right",
}

export enum ScrolliumAxis {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}
export interface ScrolliumProps {
  id: string;
  onScroll?: (params: any) => void;
  axis?: `${ScrolliumAxis}`;
}

export interface ScrolliumOnScrollProps {
  scrollPosition: number;
  isStart: boolean;
  isEnd: boolean;
  clientSize: number;
  scrollSize: number;
  progress: number;
  direction: ScrolliumDirection;
  id: string;
}
