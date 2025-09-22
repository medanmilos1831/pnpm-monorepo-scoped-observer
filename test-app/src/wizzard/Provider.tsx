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
  console.log(context);
  const step = useSyncExternalStore(
    context.activeStepSyncStore,
    context.getActiveStepSnapshot
  );
  console.log(step);
  return { step };
};

const useStepParams = () => {
  const context = useContext(Context)!;
  const params = useSyncExternalStore(
    context.stepParamsSyncStore,
    context.getStepParamsSnapshot
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
    // const unsubscribe = context.rejectSubscription(cb);
    // return () => unsubscribe();
  }, []);
};

const useWizzardNavigate = () => {
  const context = useContext(Context)!;
  return {
    nextStep: context.nextStep,
    prevStep: context.prevStep,
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
