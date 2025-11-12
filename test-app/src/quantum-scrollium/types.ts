import type { createStore } from "./Store/createStore";
import type { createEntityApiClient } from "./Store/Entity/createEntityApiClient";

export enum ScrolliumStoreEvents {
  CREATE_SCROLLIUM = "createScrollium",
}

export const SCROLLIUM_STORE_SCOPE = "scrollium-store" as const;
export const SCROLLIUM_SCOPE = "scrollium" as const;

export type IEntity = ReturnType<typeof createEntityApiClient>;

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

export type StoreReturnType = ReturnType<typeof createStore<IEntity>>;
