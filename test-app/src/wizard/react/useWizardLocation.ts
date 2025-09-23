import { useContext, useSyncExternalStore } from "react";
import { Context } from "./useStep";

export const useWizardLocation = () => {
  const context = useContext(Context)!;
  const step = useSyncExternalStore(
    context.activeStepSyncStore,
    context.getActiveStepSnapshot
  );
  return {
    isLast: context.isLast(),
    isFirst: context.isFirst(),
  };
};
