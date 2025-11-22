import {
  createScopedObserver,
  type ScopeNodeType,
} from "@med1802/scoped-observer";

function createObserver(scope?: ScopeNodeType) {
  return createScopedObserver(scope);
}

export { createObserver };
