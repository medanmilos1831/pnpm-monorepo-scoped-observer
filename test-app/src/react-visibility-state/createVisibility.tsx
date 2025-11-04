import { frameworkAPI } from "./framework/framework";
import { useVisibilitySelector } from "./react-integration/useVisibilitySelector";
import { useVisibilty } from "./react-integration/useVisibilty";
import { type VisibilityProps } from "./types";

const createVisibility = () => {
  const { store, observer } = frameworkAPI.storeComposition;
  return {
    useVisibility: (props: VisibilityProps) => {
      return useVisibilty(
        {
          store,
          observer,
        },
        props
      );
    },
    useCommands: (id: string) => {
      return store.getters.getEntityById(id).api.getCommands();
    },
    useVisibilitySelector: (id: string) => {
      return useVisibilitySelector({ store, observer }, id);
    },
    getVisibilityClient: (id: string) => {
      return store.getters.getEntityById(id).api.getClientEntity();
    },
  };
};

export { createVisibility };
