import { createStateManager } from "./createStateManager";
import { createObserver } from "./createObserver";
import type { CreateStateManagerProps } from "./types";

const framework = (function framework() {
  return {
    createStateManager,
    createObserver,
    createContext(entity: (props: any) => CreateStateManagerProps<any>) {
      const contextObserver = this.createObserver("CONTEXT_OBSERVER");
      let self = this;
      const contextStateManager = this.createStateManager({
        id: "CONTEXT_STATE_MANAGER",
        state: new Map<string, any>(),
        mutations(state) {
          return {
            createEntity: (props: any) => {
              if (!state.has(props.id)) {
                state.set(props.id, self.createStateManager(entity(props)));
              }
            },
            removeEntity: (id: string) => {
              state.delete(id);
            },
          };
        },
        getters(state) {
          return {
            getEntityById: (id: string) => state.get(id)!,
            getEntity: (id: string) => state.get(id),
            hasEntity: (id: string) => state.has(id),
            getAllEntities: () => state.values(),
            getEntityCount: () => state.size,
            getState: () => state,
          };
        },
      });
      return {
        createEntity: (props: any) =>
          contextStateManager.mutations.createEntity(props),
        removeEntity: (id: string) =>
          contextStateManager.mutations.removeEntity(id),
        getEntityById: (id: string) =>
          contextStateManager.getters.getEntityById(id),
      };
    },
    app() {
      let self = this;
      const context = this.createStateManager({
        id: "CONTEXT_STATE_MANAGER",
        state: new Map<string, ReturnType<typeof this.createContext>>(),
        mutations(state) {
          return {
            createContext: (
              name: string,
              entity: (props: any) => CreateStateManagerProps<any>
            ) => {
              if (!state.has(name)) {
                state.set(name, self.createContext(entity));
              }
            },
          };
        },
        getters(state) {
          return {
            getContext: (name: string) => state.get(name)!,
          };
        },
      });
      return context;
    },
  };
})();

export { framework };
