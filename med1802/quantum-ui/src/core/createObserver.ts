import { createScopedObserver, type ScopeNode } from "@med1802/scoped-observer";

function createObserver(scope?: ScopeNode[]) {
  return createScopedObserver(scope);
}

export { createObserver };
