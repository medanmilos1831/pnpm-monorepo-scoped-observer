import { createObserver } from "./core/observer";
import { useVisibilitySelector } from "./react-integration/useScrolliumSelector";
import { useVisibilty } from "./react-integration/useVisibilty";
import { createStore } from "./Store/createStore";
import { STORE_OBSERVER, type IEntity, type VisibilityProps } from "./types";

const createVisibility = () => {
  const store = createStore<IEntity>();
  const observer = createObserver(STORE_OBSERVER);
  return {
    useVisibility: (props: VisibilityProps) => {
      return useVisibilty(store, props);
    },
    useCommands: (id: string) => {
      return store.getters.getEntityById(id).api.getCommands();
    },
    useVisibilitySelector: (id: string) => {
      return useVisibilitySelector(
        {
          store,
          observer,
        },
        id
      );
    },
    getVisibilityClient: (id: string) => {
      return store.getters.getEntityById(id).api.getClientEntity();
    },
  };
};

export { createVisibility };
