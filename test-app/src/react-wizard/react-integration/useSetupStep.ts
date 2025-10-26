import { useEffect } from "react";
import { type IEntity, type IWizardStep } from "../types";

const useSetupStep = (entity: IEntity, props: IWizardStep) => {
  useEffect(() => {
    // let unsubscribe = () => {};
    // if (!props.onFinish) return;
    const unsubscribe = entity.addEventListenerStep("onFinish", () => {
      if (props.onNext) {
        props.onNext({
          updateSteps: (callback: (steps: string[]) => string[]) => {
            const updatedSteps = callback(entity.state.steps);
            entity.state.steps = [...new Set(updatedSteps)];
          },
          activeStep: entity.state.activeStep,
          toStep: entity.state.activeStep,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  });
};

export { useSetupStep };
