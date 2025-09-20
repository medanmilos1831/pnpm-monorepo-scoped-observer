import { createContext, useContext, useSyncExternalStore } from "react";
import type { createWizzard } from "./createWizzard";
import { WIZARD_COMMANDS } from "./constants";

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
    context.activeStepSyncStore.subscribe,
    context.activeStepSyncStore.getSnapshot
  );
  return { step };
};

const useStepParams = () => {
  const context = useContext(Context)!;
  // const params = useSyncExternalStore(
  //   context.subscribeToStepUpdate,
  //   context.getCurrentStepData
  // );
  return {};
};

const useMutateStep = () => {
  const context = useContext(Context)!;
  // return context.mutateStep;
  return {};
};

const useWizzardNavigate = () => {
  const context = useContext(Context)!;
  return {
    nextStep: () => context.command(WIZARD_COMMANDS.NEXT),
    prevStep: () => context.command(WIZARD_COMMANDS.PREV),
  };
};

const useLogging = () => {
  const context = useContext(Context)!;
};

export {
  Provider,
  useLogging,
  useMutateStep,
  useStep,
  useStepParams,
  useWizzardNavigate,
};
