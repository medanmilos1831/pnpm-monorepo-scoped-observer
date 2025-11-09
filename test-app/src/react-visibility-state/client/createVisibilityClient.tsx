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
        on: entity.actions.on,
        off: entity.actions.off,
        toggle: entity.actions.toggle,
      };
    },
  };
};

export { createVisibilityClient };
