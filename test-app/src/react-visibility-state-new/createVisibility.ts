import type { VISIBILITY_STATE } from "./types";
import { VisibilityInstance } from "./VisibilityInstance";

const createVisibility = (name: string, initState: VISIBILITY_STATE) => {
  const instance = new VisibilityInstance(name, initState);
  return instance;
};

export { createVisibility };
