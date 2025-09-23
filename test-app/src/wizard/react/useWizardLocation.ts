import { useContext, useSyncExternalStore } from "react";
import { Context } from "./useStep";

export const useWizardLocation = () => {
  const context = useContext(Context)!;
  const isFirst = useSyncExternalStore(
    context.value.activeStepSyncStore,
    context.value.isFirst
  );
  const isLast = useSyncExternalStore(
    context.value.activeStepSyncStore,
    context.value.isLast
  );

  return {
    isFirst,
    isLast,
  };
};
