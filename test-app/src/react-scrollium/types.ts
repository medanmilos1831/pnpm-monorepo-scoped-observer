import type { createStateManager } from "./Store/Entity/StateManager/createStateManager";
import type { createScroll } from "./Store/Entity/createScoll";
import type { createCommands } from "./Store/Entity/createCommands";

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
  getClient: () => {
    addEventListener: IEntity["addEventListener"];
    commands: IEntity["commands"];
    getters: IEntity["stateManager"]["getters"];
  };
  client: () => {
    scrollPosition: number;
    isScrolling: boolean;
    axis: `${ScrolliumAxis}`;
    direction: `${ScrolliumDirection}`;
    progress: number;
    isStart: boolean;
    isEnd: boolean;
  };
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
  onScroll?: (params: ReturnType<IEntity["client"]>) => void;
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
