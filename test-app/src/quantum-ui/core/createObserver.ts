import {
  createScopedObserver,
  type ScopeNodeType,
} from "../../scoped-observer";

function createObserver(scope?: ScopeNodeType) {
  return createScopedObserver(scope);
}

export { createObserver };
