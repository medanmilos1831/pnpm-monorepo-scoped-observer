import { useEffect, useState } from "react";
import { subscribe } from "@scoped-observer/core";
import { store } from "./Store";

export const useSubscribe = function <TStore = any, TResult = any>(
  callback: (store: TStore) => TResult,
  eventNames: string[]
) {
  const [result, setResult] = useState(() => {
    return callback(store.state as TStore);
  });

  useEffect(() => {
    const unsubscribers = eventNames.map((eventName) =>
      subscribe({
        scope: `store`,
        eventName,
        callback: (data) => {
          setResult(() => {
            return callback(store.state as TStore);
          });
        },
      })
    );

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  });

  return { result };
};
