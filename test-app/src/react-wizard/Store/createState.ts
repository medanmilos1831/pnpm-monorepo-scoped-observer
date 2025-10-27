import type { IWizardConfig } from "../types";

export function createState(props: IWizardConfig) {
  return {
    id: props.id,
    steps: props.steps,
    activeStep: props.activeStep,
    isLast: props.steps.length - 1 === props.steps.indexOf(props.activeStep),
    isFirst: props.steps.indexOf(props.activeStep) === 0,
    __INTERNAL__STEPS: [...props.steps],
    __INTERNAL__ACTIVE_STEP: props.activeStep,
  };
}
