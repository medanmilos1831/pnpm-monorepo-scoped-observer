type ModuleFactory<S, T> = (state: S) => T;
type ModuleMap<S> = Record<string, ModuleFactory<S, any>>;

function createModulesBase<S, M extends ModuleMap<S>>(state: S, modules: M) {
  type Built = { [K in keyof M]: ReturnType<M[K]> };

  const built = {} as Built;
  (Object.keys(modules) as Array<keyof M>).forEach((key) => {
    built[key] = modules[key](state);
  });

  return built;
}

export { createModulesBase };
