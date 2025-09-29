import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { createWizard } from "../createWizard";

const Context = createContext<ReturnType<typeof createWizard> | undefined>(
  undefined
);

const WizzardProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ReturnType<typeof createWizard>;
}) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

WizzardProvider.Step = ({ children, onAction }: PropsWithChildren<any>) => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: "wizard:commands",
      eventName: "action",
      callback: ({ payload: command }: { payload: any }) => {
        console.log("action", command);
        if (onAction) {
          onAction(command);
        }
      },
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <>{children}</>;
};

export { Context, WizzardProvider };
