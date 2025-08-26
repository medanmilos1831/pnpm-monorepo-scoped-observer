export type TransitionMap<S extends string, T extends string> = {
  [K in S]: {
    on: Partial<Record<T, S>>;
  };
};
