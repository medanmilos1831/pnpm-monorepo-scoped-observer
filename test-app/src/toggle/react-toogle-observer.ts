import { createMessageBroker } from "../broker";
import { createScopedObserver, type ScopeNode } from "@med1802/scoped-observer";
import type { Channel } from "./types";
import { createHandlers } from "./handlers";
import { createReactHooks } from "./react-hooks";
import { createStore } from "./store";
const createReactToggleObserver = <T extends { [key: string]: any }>(
  params: T
) => {
  const scopes: ScopeNode[] = Object.keys(params).map((scope) => ({
    scope,
  }));
  const scopedObserver = createScopedObserver(scopes);
  const messageBroker = createMessageBroker(scopedObserver);
  const obj = {} as Record<keyof T, Channel>;
  Object.keys(params).forEach((key) => {
    const store = createStore(key, messageBroker);
    const { useToggle, useInterceptor } = createReactHooks(store);
    obj[key as keyof T] = (() => {
      return {
        open: store.open,
        close: store.close,
        subscribe: store.subscribe,
        useToggle,
        useInterceptor,
      };
    })();
  });
  return obj;
};

export { createReactToggleObserver };
