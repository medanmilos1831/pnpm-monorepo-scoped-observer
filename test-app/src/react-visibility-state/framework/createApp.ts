import { framework } from "./framework";
import type {
  CreateStateManagerProps,
  IApp,
  StateManagerInstance,
} from "./types";

function createApp<S = any, M = any, G = any>(
  client: (app: IApp<S, M, G>) => any,
  config: {
    entity(props: any): CreateStateManagerProps<S>;
    appName: string;
  }
) {
  const observer = framework.createObserver("APP_OBSERVER");
  const appStateManager = framework.createStateManager({
    id: "APP_STATE_MANAGER",
    state: new Map<string, StateManagerInstance<S, M, G>>(),
    mutations(state) {
      return {
        createEntity: (props: any) => {
          if (!state.has(props.id)) {
            state.set(
              props.id,
              framework.createStateManager(
                config.entity(props)
              ) as StateManagerInstance<S, M, G>
            );
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

  return client({
    createEntity(props: any) {
      appStateManager.mutations.createEntity(props);
    },
    removeEntity: (id: string) => {
      appStateManager.mutations.removeEntity(id);
    },
    getEntityById: (id: string) => {
      return appStateManager.getters.getEntityById(id);
    },
  });
}

export { createApp };
