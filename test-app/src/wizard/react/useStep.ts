import { createContext, useContext, useSyncExternalStore } from "react";
import { createWizard } from "../createWizard";

const Context = createContext<ReturnType<typeof createWizard> | undefined>(
  undefined
);

export const useStep = () => {
  const context = useContext(Context)!;
  console.log(context);
  const step = useSyncExternalStore(
    context.activeStepSyncStore,
    context.getActiveStepSnapshot
  );
  console.log(step);
  return { step };
};

export { Context };
