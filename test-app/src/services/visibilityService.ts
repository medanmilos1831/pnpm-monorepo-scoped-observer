import { createVisibility } from "../react-visibility-state";

const { useVisibility, VisibilityHandler, getItem, useWatch } =
  createVisibility({
    keys: [
      "user",
      "city",
      "company",
      "product",
      "order",
      "payment",
      "login",
      "confirm",
      "settings",
      "profile",
      "notification",
      "help",
    ] as const,
  });

export { useVisibility, VisibilityHandler, getItem, useWatch };
