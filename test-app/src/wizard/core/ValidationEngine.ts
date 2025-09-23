import {
  WIZARD_COMMANDS,
  type IStep,
  type WizardCommand,
  type WizardRejectCallback,
} from "../types";

class ValidationEngine {
  private nextValidator = ({
    step,
    resolve,
    reject,
  }: {
    step: IStep;
    resolve: () => void;
    reject: WizardRejectCallback;
  }) => {
    if (!step.validators.onNext) {
      resolve();
      return;
    }
    step.validators.onNext?.(step, resolve, reject) ?? true;
  };

  private prevValidator = ({
    step,
    resolve,
    reject,
  }: {
    step: IStep;
    resolve: () => void;
    reject: WizardRejectCallback;
  }) => {
    if (!step.validators.onPrev) {
      resolve();
      return;
    }
    step.validators.onPrev?.(step, resolve, reject) ?? true;
  };

  execute = ({
    step,
    command,
    resolve,
    reject,
  }: {
    step: IStep;
    command: WizardCommand;
    resolve: () => void;
    reject: WizardRejectCallback;
  }) => {
    const obj = {
      step,
      resolve,
      reject,
    };
    command === WIZARD_COMMANDS.NEXT
      ? this.nextValidator(obj)
      : this.prevValidator(obj);
  };
}

export { ValidationEngine };
