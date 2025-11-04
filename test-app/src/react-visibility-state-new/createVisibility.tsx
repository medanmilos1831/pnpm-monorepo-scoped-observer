import { createObserver } from "./core/observer";
import { useVisibilty } from "./react-integration/useVisibilty";
import { createStore } from "./Store/createStore";
import type { VisibilityProps } from "./types";

const createVisibility = () => {
  const store = createStore<any>();
  const observer = createObserver("visibility-observer");
  return {
    useVisibility: (props: VisibilityProps) => {
      return useVisibilty(store, props);
    },
  };
};

export { createVisibility };
