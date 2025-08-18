import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import {
  createVisibilityRegistry,
  VisibilityRegistry,
} from "./createVisibilityRegistry";

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
    props: "open" | "close",
    handler: (payload?: any) => void
  ) => ReactNode;
};

const VisibilityHandler = ({ children, name }: VisibilityHandlerProps) => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error("VisibilityHandler must be used within VisibilityProvider");
  }
  const [machine] = useState(() => context.subscribe(name));

  const { state } = machine.useMachine();

  useEffect(() => {
    return () => {
      context.removeItem(name);
    };
  }, [name]);

  return (
    <>
      {children(state, (payload?: any) => {
        machine.send({
          type: "TOGGLE",
          payload,
        });
      })}
    </>
  );
};

const useVisibility = (name: string) => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error("useVisibility must be used within VisibilityProvider");
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
