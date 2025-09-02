import { createVisibility } from "../react-visibility-state";

const { useVisibility, getItem, useWatch, VisibilityHandler } =
  createVisibility({
    keys: ["user", "city"] as const,
  });

export { useVisibility, getItem, useWatch, VisibilityHandler };
