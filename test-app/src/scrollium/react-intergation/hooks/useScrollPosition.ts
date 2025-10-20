import { useContext, useState, useSyncExternalStore } from "react";
import { useScroll } from "./useScroll";
import { ScrollContext } from "../Scroll";

const useScrollPosition = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("ScrollContext not found");
  }
  const client = useScroll(context.id)!;
  //   const [subsciber, __] = useState(() => (notify: () => void) => {
  //     return client.subscribe(WizardEvents.ON_STEP_CHANGE, () => {
  //       notify();
  //     });
  //   });
  //   const stepName = useSyncExternalStore(subsciber, client.getActiveStep);
  return {
    scrollPosition: 0,
  };
  //   return {
  //     stepName,
  //     steps: client.getSteps(),
  //     wizardId: client.getWizardId(),
  //     isLast: client.isLast(),
  //     isFirst: client.isFirst(),
  //   };
};

export { useScrollPosition };
