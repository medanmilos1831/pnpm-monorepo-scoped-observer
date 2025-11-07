import { createScopedObserver } from "@scoped-observer/core";

function createObserver(scope: string) {
  const observer = createScopedObserver([
    {
      scope,
    },
  ]);
  return {
    scope,
    observer,
  };
}

export { createObserver };
