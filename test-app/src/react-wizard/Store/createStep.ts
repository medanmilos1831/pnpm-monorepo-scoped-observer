import type { IWizardStep } from "../types";

export function createStep() {
  let stepConfiguration: IWizardStep | undefined = undefined;
  return {
    defineStep: (props: IWizardStep) => {
      stepConfiguration = props;
    },
    getStep: () => {
      return stepConfiguration;
    },
  };
}
