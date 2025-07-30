import { IScopedObserver } from '@scoped-observer/core';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

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

function useScopedObserver<T>(
  initState: T,
  {
    scope,
    callback,
  }: { scope: string; callback: (prev: T, payload: any) => T },
  events: string[]
): T {
  const [state, setState] = useState<T>(initState);
  const context = useContext(ScopedObserverContext)!;

  useEffect(() => {
    const clear = events.map((event) =>
      context.subscribe({
        scope,
        callback: ({ payload }) => {
          setState((prev) => callback(prev, payload));
        },
        eventName: event,
      })
    );
    return () => {
      clear.forEach((item) => item());
    };
  }, [scope, events.join(',')]);

  return state;
}

const useSilentScopedObserver = (
  { scope, callback }: { scope: string; callback: (payload: any) => void },
  events: string[]
) => {
  const context = useContext(ScopedObserverContext)!;

  useEffect(() => {
    const clear = events.map((event) =>
      context.subscribe({
        scope,
        eventName: event,
        callback: ({ payload }) => {
          callback(payload);
        },
      })
    );

    return () => {
      clear.forEach((unsubscribe) => unsubscribe());
    };
  }, [scope, events.join(',')]);
};

export {
  ScopedObserverProvider,
  useDispatch,
  useScopedObserver,
  useSilentScopedObserver,
};
