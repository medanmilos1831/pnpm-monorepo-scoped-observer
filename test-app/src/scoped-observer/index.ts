import { EventScope } from "./EventScope";
import { ROOT_SCOPE, type ScopeNode } from "./types";

const createScopedObserver = (props?: ScopeNode[]) => {
  const root = new EventScope(ROOT_SCOPE);
  props?.forEach((node) => {
    const scope = buildScopeHierarchy(node);
    root.subScopes.set(node.scope, scope);
  });
  function buildScopeHierarchy(node: ScopeNode): EventScope {
    const eventScope = new EventScope(node.scope);

    if (node.subScopes && node.subScopes.length > 0) {
      node.subScopes.forEach((subNode) => {
        const subScope = buildScopeHierarchy(subNode);
        eventScope.subScopes.set(subNode.scope, subScope);
      });
    }

    return eventScope;
  }

  function find(scope?: string): EventScope | undefined {
    if (!scope || scope.trim() === "") {
      return root;
    }

    const scopeParts = scope.split(":").filter(Boolean);
    let current: EventScope = root;

    for (const part of scopeParts) {
      const next = current.subScopes.get(part);
      if (!next) {
        return undefined;
      }
      current = next;
    }

    return current;
  }
  return {
    dispatch: ({
      scope,
      eventName,
      payload = undefined,
    }: {
      scope?: string;
      eventName: string;
      payload?: any;
    }) => {
      const scopeEntity = find(scope);
      if (!scopeEntity) return;
      scopeEntity.dispatch({ eventName, payload });
    },
    subscribe: ({
      scope,
      eventName,
      callback,
    }: {
      scope?: string;
      eventName: string;
      callback: (payload: any) => void;
    }) => {
      const scopeEntity = find(scope);
      if (!scopeEntity) return;
      const unsubscribe = scopeEntity.subscribe(eventName, callback);
      return unsubscribe;
    },
  };
};

type ScopeNodeType = ScopeNode[];

type scopedObserverType = ReturnType<typeof createScopedObserver>;
type scopedObserverDispatchType = {
  scope?: string;
  eventName: string;
  payload?: any;
};
type scopedObserverSubscribeType = {
  scope?: string;
  eventName: string;
  callback: (payload: any) => void;
};
export {
  createScopedObserver,
  type ScopeNodeType,
  type scopedObserverType,
  type scopedObserverDispatchType,
  type scopedObserverSubscribeType,
};
