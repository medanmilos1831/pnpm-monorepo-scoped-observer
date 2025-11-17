import { core } from "../core/core";
import { createModel } from "./createModel";
import type { CreateModuleConfigType, ModelEntityPropType } from "./types";

const framework = (function () {
  return {
    createModule<S = any, M = any, G = any, A = any>(
      moduleConfig: CreateModuleConfigType<S, M, G, A>
    ) {
      const observer = core.createObserver();
      const moduleStateManager = core.createStateManager({
        id: moduleConfig.name,
        state: {
          modules: new Map<string, any>(),
        },
        mutations(state) {
          return {
            createModel(name: string, model: any) {
              state.modules.set(name, model);
            },
            removeModel(id: string) {
              state.modules.delete(id);
            },
          };
        },
        getters(state) {
          return {
            getModelById: (id: string) => state.modules.get(id)!,
            hasModel: (id: string) => state.modules.has(id),
          };
        },
      });
      return {
        createModel: (params: any) => {
          if (moduleStateManager.getters.hasModel(params.id)) {
            return;
          }
          const model = createModel(moduleConfig, params);
          moduleStateManager.mutations.createModel(params.id, model);
          setTimeout(() => {
            observer.dispatch({
              eventName: `onModelMount-${params.id}`,
              payload: undefined,
            });
          }, 0);
        },
        getModelById: (id: string) => {
          return moduleStateManager.getters.getModelById(id) as A;
        },
        removeModel: (id: string) => {
          moduleStateManager.mutations.removeModel(id);
          observer.dispatch({
            eventName: `onModelUnmount-${id}`,
            payload: undefined,
          });
        },
        lifeCycle(this: string) {
          return {
            mount: (notify: () => void) => {
              return observer.subscribe({
                eventName: `onModelMount-${this}`,
                callback: () => {
                  notify();
                },
              })!;
            },
            unmount: (notify: () => void) => {
              return observer.subscribe({
                eventName: `onModelUnmount-${this}`,
                callback: () => {
                  notify();
                },
              })!;
            },
          };
        },
        hasModel: (id: string) => {
          return moduleStateManager.getters.hasModel(id);
        },
      };
    },
  };
})();

export { framework };
