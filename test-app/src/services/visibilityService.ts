import { createVisibility } from "react-visibility-state";

const { useVisibility, VisibilityHandler, getItem, useWatch } =
  createVisibility({
    keys: ["userModal"] as const,
  });
export { useVisibility, VisibilityHandler, getItem, useWatch };
