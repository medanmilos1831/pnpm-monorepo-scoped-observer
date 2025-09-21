import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
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
  const params = useSyncExternalStore(
    context.stepParamsSyncStore.subscribe,
    context.stepParamsSyncStore.getSnapshot
  );
  return {
    isCompleted: params.isCompleted,
    isChanged: params.isChanged,
    state: params.state,
  };
};

const useMutateStep = () => {
  const context = useContext(Context)!;
  return {
    mutate: (
      cb: (obj: { isCompleted: boolean; isChanged: boolean; state: any }) => {
        isCompleted: boolean;
        isChanged: boolean;
        state: any;
      }
    ) => {
      context.mutateStep(cb);
    },
  };
};

const useWizardReject = (cb: (payload: any) => void) => {
  const context = useContext(Context)!;
  useEffect(() => {
    const unsubscribe = context.rejectSubscription(cb);
    return () => unsubscribe();
  }, []);
};

const useWizzardNavigate = () => {
  const context = useContext(Context)!;
  return {
    nextStep: () => context.command(WIZARD_COMMANDS.NEXT),
    prevStep: () => context.command(WIZARD_COMMANDS.PREV),
  };
};

export {
  Provider,
  useMutateStep,
  useStep,
  useStepParams,
  useWizzardNavigate,
  useWizardReject,
};
