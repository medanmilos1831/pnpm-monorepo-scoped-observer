import type {
  IOnNavigateParams,
  IOnValidateParams,
  IWizardStep,
} from "../../react-intergation/types";

class StepModule {
  validate: ((params: IOnValidateParams) => void) | undefined = undefined;
  onNext: ((params: IOnNavigateParams) => void) | undefined = undefined;
  onPrevious: ((params: IOnNavigateParams) => void) | undefined = undefined;

  defineStep = (props: IWizardStep) => {
    this.validate = props.validate;
    this.onNext = props.onNext;
    this.onPrevious = props.onPrevious;
  };
}

export { StepModule };
