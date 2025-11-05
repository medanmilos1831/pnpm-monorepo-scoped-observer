import { frameworkAPI } from "./framework/framework";
import { frameworkApi } from "./framework/frameworkApi";
import { useVisibilty } from "./react-integration/useVisibilty";
import { type VisibilityProps } from "./types";

const createVisibility = () => {
  return {
    useVisibility: (props: VisibilityProps) => {
      return useVisibilty(props);
    },
    useCommands: (id: string) => {
      const entity = frameworkApi.getEntityApiClientById(id);
      const commands = entity.getCommands();
      return commands;
    },
    useVisibilitySelector: (id: string) => {
      // return useVisibilitySelector(id);
    },
    getVisibilityClient: (id: string) => {
      // return frameworkAPI
      //   .getStore()
      //   .getters.getEntityById(id)
      //   .api.getClientEntity();
    },
  };
};

export { createVisibility };
