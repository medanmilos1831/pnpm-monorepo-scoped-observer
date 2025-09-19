import { createContext, useContext, useSyncExternalStore } from "react";
import type { createWizzard } from "./createWizzard";

const Context = createContext<ReturnType<typeof createWizzard> | undefined>(
  undefined
);
const Provider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ReturnType<typeof createWizzard>;
}) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useStep = () => {
  const context = useContext(Context)!;
  useSyncExternalStore(
    context.onStepUpdateSubscribe,
    context.onStepUpdateNotify
  );
  const step = useSyncExternalStore(
    context.onStepChangeSubscribe,
    context.onStepChangeNotify
  );
  return step;
};

const useMutateStep = () => {
  const context = useContext(Context)!;
  return context.mutateStep;
};

const useWizzardNavigate = () => {
  const context = useContext(Context)!;
  return {
    nextStep: context.nextStep,
    prevStep: context.prevStep,
  };
};

export { Provider, useStep, useWizzardNavigate, useMutateStep };
