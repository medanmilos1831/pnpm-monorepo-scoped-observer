import { createScopedObserver } from "@med1802/scoped-observer";

function createObserver(scope: string) {
  return createScopedObserver(scope);
}

export { createObserver };
