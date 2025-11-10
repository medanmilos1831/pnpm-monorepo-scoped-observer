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
        onChange: entity.actions.onChange,
      };
    },
  };
};

export { createVisibilityClient };
