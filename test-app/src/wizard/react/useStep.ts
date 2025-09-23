import { createContext, useContext, useSyncExternalStore } from "react";
import { createWizard } from "../createWizard";

const Context = createContext<
  { value: ReturnType<typeof createWizard>; someState: string } | undefined
>(undefined);

export const useStep = () => {
  const context = useContext(Context)!;
  const step = useSyncExternalStore(
    context.value.activeStepSyncStore,
    context.value.getActiveStepSnapshot
  );
  return { step };
};

export { Context };
