import { core } from "../core/core";
import type { CreateStateManagerProps } from "./types";

export function createContextInstance(
  id: string,
  entity: (props: any) => CreateStateManagerProps<any>,
  actions: any,
  listeners: any
) {
  const { dispatch, subscribe } = core.createObserver("CONTEXT_OBSERVER");
  function dispatchAction(params: { eventName: string; payload: any }) {
    const { eventName, payload } = params;
    dispatch(eventName, payload);
  }
  const contextStateManager = core.createStateManager({
    id,
    state: new Map<
      string,
      {
        stateManager: ReturnType<typeof core.createStateManager>;
        actions: any;
        listeners: any;
      }
    >(),
    mutations(state) {
      return {
        createEntity: (props: any) => {
          if (!state.has(props.id)) {
            const stateManager = core.createStateManager(entity(props));
            state.set(props.id, {
              stateManager,
              actions: actions(stateManager, dispatchAction),
              listeners: listeners(stateManager, subscribe),
            });
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
}
