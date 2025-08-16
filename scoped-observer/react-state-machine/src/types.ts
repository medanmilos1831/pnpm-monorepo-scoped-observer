export const MACHINE_EVENT = "machineEvent";
export const MACHINE_SCOPE = "machineScope";

export type TransitionMap<S extends string, T extends string = string> = {
  [K in S]: {
    on: {
      [K2 in T]?: S;
    };
  };
};
