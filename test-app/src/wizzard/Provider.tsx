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
  const step = useSyncExternalStore(
    context.onStepChangeSubscribe,
    context.onStepChangeNotify
  );
  return step;
};

const useStepParams = () => {
  const context = useContext(Context)!;
  const params = useSyncExternalStore(
    context.onStepUpdateSubscribe,
    context.onStepUpdateNotify
  );
  return params;
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

const useLogging = () => {
  const context = useContext(Context)!;
  return context.logging;
};

export {
  Provider,
  useStep,
  useWizzardNavigate,
  useMutateStep,
  useStepParams,
  useLogging,
};
