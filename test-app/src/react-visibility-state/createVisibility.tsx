import { frameworkAPI } from "./framework/framework";
import { useVisibilitySelector } from "./react-integration/useVisibilitySelector";
import { useVisibilty } from "./react-integration/useVisibilty";
import { type VisibilityProps } from "./types";

const createVisibility = () => {
  return {
    useVisibility: (props: VisibilityProps) => {
      return useVisibilty(props);
    },
    useCommands: (id: string) => {
      return frameworkAPI
        .getStore()
        .getters.getEntityById(id)
        .api.getCommands();
    },
    useVisibilitySelector: (id: string) => {
      return useVisibilitySelector(id);
    },
    getVisibilityClient: (id: string) => {
      return frameworkAPI
        .getStore()
        .getters.getEntityById(id)
        .api.getClientEntity();
    },
  };
};

export { createVisibility };
