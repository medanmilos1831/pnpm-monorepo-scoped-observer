import { framework } from "./framework/framework";

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

export type IEntity = ReturnType<typeof framework.createModuleInstance>;

export enum VisibilityPublicEvents {
  ON_VISIBILITY_CHANGE = "onVisibilityChange",
}

export enum VisibilityStoreEvents {
  CREATE_VISIBILITY = "createVisibility",
}

export type VisibilityPublicEventsType = `${VisibilityPublicEvents}`;
export type VisibilityStoreEventsType = `${VisibilityStoreEvents}`;
