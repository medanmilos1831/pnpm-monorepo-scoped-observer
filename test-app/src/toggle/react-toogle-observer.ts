import { createMessageBroker } from "../broker";
import { createScopedObserver, type ScopeNode } from "@med1802/scoped-observer";
import type { Channel } from "./types";
import { createHandlers } from "./handlers";
import { createReactHooks } from "./react-hooks";
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
    const { open, close, subscribe } = createHandlers(messageBroker, key);
    const { useToggle } = createReactHooks(messageBroker, key);
    obj[key as keyof T] = (() => {
      return {
        open,
        close,
        subscribe,
        useToggle,
      };
    })();
  });
  return obj;
};

export { createReactToggleObserver };
