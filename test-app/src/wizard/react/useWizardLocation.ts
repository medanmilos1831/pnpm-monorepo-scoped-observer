import { useContext, useSyncExternalStore } from "react";
import { Context } from "./useStep";

export const useWizardLocation = () => {
  const context = useContext(Context)!;
  const step = useSyncExternalStore(
    context.value.activeStepSyncStore,
    context.value.getActiveStepSnapshot
  );

  return {
    isFirst: context.value.isFirst(),
    isLast: context.value.isLast(),
  };
};
