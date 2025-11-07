import { framework } from "./framework";

interface IApp {
  createEntity: (props: { id: string }, entity: () => any) => any;
  removeEntity: (id: string) => any;
  getEntityById: (id: string) => any;
}

function createApp(client: (app: IApp) => any) {
  const observer = framework.createObserver("APP_OBSERVER");
  const appStateManager = framework.createStateManager({
    id: "APP_STATE_MANAGER",
    state: new Map<string, any>(),
    mutations(state) {
      return {
        createEntity<P extends { id: string }>(props: P, entity: () => any) {
          if (!state.has(props.id)) {
            state.set(props.id, entity());
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
      };
    },
  });

  return client({
    createEntity(props: { id: string }, entity: () => any) {
      appStateManager.mutations.createEntity(props, () => entity());
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
