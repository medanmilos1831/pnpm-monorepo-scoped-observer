import { framework } from "./framework";

type StateManagerInstance<E> = ReturnType<
  typeof framework.createStateManager<E, any, any>
>;

type CreateStateManagerProps<E> = {
  id: string;
  state: E;
  mutations: (state: E) => Record<string, (...args: any[]) => any>;
  getters: (state: E) => Record<string, (...args: any[]) => any>;
};

interface IApp<E = any> {
  createEntity: (p: CreateStateManagerProps<E>) => any;
  removeEntity: (id: string) => any;
  getEntityById: (id: string) => StateManagerInstance<E>;
}

function createApp<E = any>(client: (app: IApp<E>) => any) {
  const observer = framework.createObserver("APP_OBSERVER");
  const appStateManager = framework.createStateManager({
    id: "APP_STATE_MANAGER",
    state: new Map<string, StateManagerInstance<E>>(),
    mutations(state) {
      return {
        createEntity: (props: CreateStateManagerProps<E>) => {
          if (!state.has(props.id)) {
            state.set(props.id, framework.createStateManager(props));
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
    createEntity(props: CreateStateManagerProps<E>) {
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
