import { createScopedObserver, type ScopeNode } from "@med1802/scoped-observer";
import { createMessageBroker } from "../broker";
import { createReactHooks } from "./react-hooks";
import { createStore } from "./store";
import type { Channel, LoggerParams } from "./types";
const createReactToggleObserver = <
  T extends {
    [key: string]: {
      logger: (params: LoggerParams) => void;
    };
  }
>(
  params: T
) => {
  const scopes: ScopeNode[] = Object.keys(params).map((scope) => ({
    scope,
  }));
  console.log("SCOPES", params);
  const scopedObserver = createScopedObserver(scopes);
  const messageBroker = createMessageBroker(scopedObserver);
  const obj = {} as Record<keyof T, Channel>;
  Object.keys(params).forEach((key) => {
    const store = createStore(key, messageBroker, params[key]);
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
