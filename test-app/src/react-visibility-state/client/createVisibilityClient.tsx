import { useVisibilty } from "../react-integration/useVisibilty";
import { type VisibilityProps } from "../types";
import { visibilityContext } from "./context";

const createVisibilityClient = () => {
  return {
    useVisibility: (props: VisibilityProps) => {
      visibilityContext.createContext(props);
      return useVisibilty(props);
    },
    useVisibilityCommands: (id: string) => {
      const entity = visibilityContext.getContextById(id);
      return {
        onChange: () => {
          entity.entity.mutations.setVisibility(
            entity.entity.getters.getVisibility() === "on" ? "off" : "on"
          );
          entity.actions.onChange();
        },
        onOpen: () => {
          entity.entity.mutations.setVisibility("on");
          entity.actions.onChange();
        },
        onClose: () => {
          entity.entity.mutations.setVisibility("off");
          entity.actions.onChange();
        },
      };
    },
  };
};

export { createVisibilityClient };
