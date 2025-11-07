import { framework } from "./framework";

interface IApp<E = any> {
  // createEntity: (props: { id: string }, entity: () => any) => any;
  createEntity: (p: any) => any;
  removeEntity: (id: string) => any;
  getEntityById: (
    id: string
  ) => ReturnType<typeof framework.createStateManager>;
}

function createApp<E = any>(client: (app: IApp<E>) => any) {
  const observer = framework.createObserver("APP_OBSERVER");
  const appStateManager = framework.createStateManager({
    id: "APP_STATE_MANAGER",
    state: new Map<string, ReturnType<typeof framework.createStateManager>>(),
    mutations(state) {
      return {
        createEntity: (props: any) => {
          state.set(props.id, props);
        },
        // createEntity<P extends { id: string }>(props: P, entity: () => any) {
        //   if (!state.has(props.id)) {
        //     state.set(props.id, entity());
        //   }
        // },
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
    createEntity<P extends { id: string }>(props: P) {
      appStateManager.mutations.createEntity(props);
      // appStateManager.mutations.createEntity(props, () => {
      // });
      console.log(appStateManager.getters.getState());
    },
    // createEntity(props: { id: string }, entity: () => any) {
    //   // appStateManager.mutations.createEntity(props, () => entity());
    // },
    removeEntity: (id: string) => {
      appStateManager.mutations.removeEntity(id);
    },
    getEntityById: (id: string) => {
      return appStateManager.getters.getEntityById(id);
    },
  });
}

export { createApp };
