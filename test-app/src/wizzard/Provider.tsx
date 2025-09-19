import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import type { createWizzard } from "./createWizzard";
import type { IStep } from "./types";

const Context = createContext<ReturnType<typeof createWizzard> | undefined>(
  undefined
);
const Provider = ({
  children,
  value,
}: // onNextStep,
{
  children: React.ReactNode;
  value: ReturnType<typeof createWizzard>;
  // onNextStep: (step: IStep) => boolean;
}) => {
  // useEffect(() => {
  //   value.onNextStepSubscribe(onNextStep);
  // }, []);
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

const useStepValidation = (obj: {
  onNextStep: (step: IStep) => boolean;
  onFail: () => void;
}) => {
  const context = useContext(Context)!;
  useEffect(() => {
    const unsubscribe = context.onNextStepSubscribe(obj);
    return () => {
      unsubscribe();
    };
  }, [obj.onNextStep, obj.onFail]);
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
  useStepValidation,
  useLogging,
};
