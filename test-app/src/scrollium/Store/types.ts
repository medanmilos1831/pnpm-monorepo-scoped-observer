export enum ScrolliumStoreEvents {
  CREATE_SCROLLIUM = "createScrollium",
}

export const SCROLLIUM_STORE_SCOPE = "scrollium-store" as const;
export const SCROLLIUM_SCOPE = "scrollium" as const;

export enum ScrolliumEvents {
  ON_SCROLL = "onScroll",
  ON_SCROLL_STOP = "onScrollStop",
}

export enum ScrolliumDirection {
  UP = "up",
  DOWN = "down",
  NONE = "none",
}
