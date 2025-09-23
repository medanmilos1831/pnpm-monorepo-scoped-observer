import { useContext, useSyncExternalStore } from "react";
import { Context } from "./useStep";

export const useWizardLocation = () => {
  const context = useContext(Context)!;
  const isFirst = useSyncExternalStore(
    context.value.activeStepSyncStore,
    context.value.getIsFirst
  );
  const isLast = useSyncExternalStore(
    context.value.activeStepSyncStore,
    context.value.getIsLast
  );

  return {
    isFirst,
    isLast,
  };
};
