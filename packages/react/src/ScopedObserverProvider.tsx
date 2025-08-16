import { IScopedObserver } from "@scoped-observer/core";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";

const ScopedObserverContext = createContext<IScopedObserver | undefined>(
  undefined
);

const ScopedObserverProvider = ({
  children,
  observer,
}: PropsWithChildren<{ observer: IScopedObserver }>) => {
  return (
    <ScopedObserverContext.Provider value={observer}>
      {children}
    </ScopedObserverContext.Provider>
  );
};

const useDispatch = () => {
  const context = useContext(ScopedObserverContext);
  return (prop: { scope: string; eventName: string; payload?: any }) =>
    context?.dispatch(prop);
};

const useSubscribe = (
  { scope, callback }: { scope: string; callback: (payload: any) => void },
  events: string[]
) => {
  const context = useContext(ScopedObserverContext)!;

  useEffect(() => {
    const clean = events.map((event) =>
      context.subscribe({
        scope,
        eventName: event,
        callback,
      })
    );
    return () => {
      clean.forEach((unsubscribe) => unsubscribe());
    };
  }, [scope, events, context]);
};

export { ScopedObserverProvider, useSubscribe, useDispatch };
