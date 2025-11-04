export type VisibilityProps = {
  id: string;
  initState: initialStateType;
};

export enum INITIAL_STATE {
  ON = "on",
  OFF = "off",
}

export type initialStateType = `${INITIAL_STATE}`;

export const STORE_OBSERVER = "store-observer" as const;
export const ENTITY_OBSERVER = "entity-observer" as const;

export enum VisibilityPublicEvents {
  ON_VISIBILITY_CHANGE = "onVisibilityChange",
}

export type VisibilityPublicEventsType = `${VisibilityPublicEvents}`;
