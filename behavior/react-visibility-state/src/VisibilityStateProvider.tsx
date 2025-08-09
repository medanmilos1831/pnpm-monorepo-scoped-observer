import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from 'react';
import {
  createVisibilityRegistry,
  VisibilityRegistry,
} from './createVisibilityRegistry';
import { useMachine } from '@scoped-observer/react-state-machine';

const VisibilityContext = createContext<VisibilityRegistry | undefined>(
  undefined
);

const VisibilityStateProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: VisibilityRegistry }>) => {
  return (
    <VisibilityContext.Provider value={value}>
      {children}
    </VisibilityContext.Provider>
  );
};

type VisibilityHandlerProps = {
  name: string;
  children: (
    props: 'open' | 'close',
    handler: (payload?: any) => void
  ) => ReactNode;
};

const VisibilityHandler = ({ children, name }: VisibilityHandlerProps) => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error('VisibilityHandler must be used within VisibilityProvider');
  }
  const [machine] = useState(() => context.subscribe(name));

  useMachine(machine);

  useEffect(() => {
    return () => {
      context.removeItem(name);
    };
  }, [name]);

  const state = machine.state as 'open' | 'close';

  return (
    <>
      {children(state, (payload?: any) => {
        machine.handler({
          type: 'TOGGLE',
          payload,
        });
      })}
    </>
  );
};

const useVisibility = (name: string) => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error('useVisibility must be used within VisibilityProvider');
  }

  return {
    handle: (payload?: any) => {
      context.handleVisibility(name, payload);
    },
  };
};

export {
  VisibilityHandler,
  VisibilityStateProvider,
  useVisibility,
  createVisibilityRegistry,
};
