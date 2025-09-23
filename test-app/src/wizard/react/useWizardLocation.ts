import { useContext, useSyncExternalStore } from "react";
import { Context } from "./useStep";

export const useWizardLocation = () => {
  const context = useContext(Context)!;
  const isFirst = useSyncExternalStore(
    context.activeStepSyncStore,
    context.isFirst
  );
  const isLast = useSyncExternalStore(
    context.activeStepSyncStore,
    context.isLast
  );
  return {
    isFirst,
    isLast,
  };
};
