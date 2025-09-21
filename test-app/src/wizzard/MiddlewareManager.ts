import { WIZARD_COMMANDS, type WizardCommand } from "./constants";
import type { IStep, WizzardRoute } from "./types";

class MiddlewareManager {
  private nextValidator = ({
    step,
    resolve,
    reject,
  }: {
    step: IStep;
    resolve: () => void;
    reject: () => void;
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
    reject: () => void;
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
    reject: () => void;
  }) => {
    if (command === WIZARD_COMMANDS.NEXT) {
      this.nextValidator({
        step,
        resolve,
        reject,
      });
    } else {
      this.prevValidator({
        step,
        resolve,
        reject,
      });
    }
  };
}

export { MiddlewareManager };
