import { useContext, useSyncExternalStore } from "react";
import { Context } from "./useStep";

export const useStepParams = () => {
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
