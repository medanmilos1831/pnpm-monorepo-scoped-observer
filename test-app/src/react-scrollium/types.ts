import type { createStateManager } from "./Store/Entity/createStateManager";
import type { createModules } from "./Store/Entity/createModules";
import type { createEntityBase } from "./Store/createEntityBase";

export enum ScrolliumStoreEvents {
  CREATE_SCROLLIUM = "createScrollium",
}

export const SCROLLIUM_STORE_SCOPE = "scrollium-store" as const;
export const SCROLLIUM_SCOPE = "scrollium" as const;

export interface IEntity {
  stateManager: ReturnType<typeof createStateManager>;
  modules: ReturnType<typeof createModules>;
  mount: () => void;
  addEventListener: (
    eventName: `${ScrolliumPublicEventsType}`,
    callback: (payload: any) => void
  ) => () => void;
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
