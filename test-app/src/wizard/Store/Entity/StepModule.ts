import type {
  IOnNextPreviousParams,
  IOnValidateParams,
  IWizardStep,
} from "../../react-intergation/types";

class StepModule {
  validate: ((params: IOnValidateParams) => void) | undefined = undefined;
  onNext: ((params: IOnNextPreviousParams) => void) | undefined = undefined;
  onPrevious: ((params: IOnNextPreviousParams) => void) | undefined = undefined;

  defineStep = (props: IWizardStep) => {
    this.validate = props.validate;
    this.onNext = props.onNext;
    this.onPrevious = props.onPrevious;
  };
}

export { StepModule };
