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

const pera = createVisibility({
  keys: ["userModal"] as const,
});

export { useVisibility, VisibilityHandler, getItem, useWatch, pera };
