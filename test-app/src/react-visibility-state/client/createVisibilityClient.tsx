import { useVisibilty } from "../react-integration/useVisibilty";
import { type VisibilityProps } from "../types";
import { visibilityContext } from "./context";

const createVisibilityClient = () => {
  return {
    useVisibility: (props: VisibilityProps) => {
      visibilityContext.createEntity(props);
      return useVisibilty(props);
    },
  };
};

export { createVisibilityClient };
