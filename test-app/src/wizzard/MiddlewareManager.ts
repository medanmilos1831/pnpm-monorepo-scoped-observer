import { WIZARD_COMMANDS, type WizardCommand } from "./constants";
import type { IStep, WizzardRoute } from "./types";

class MiddlewareManager {
  middlewares: Map<string, WizzardRoute["validators"]> = new Map();

  private onNextCommand = (
    step: IStep,
    resolve: () => void,
    reject: () => void
  ): boolean => {
    return (
      this.middlewares.get(step.name)?.onNext?.(step, resolve, reject) ?? true
    );
  };

  private onPrevCommand = (
    step: IStep,
    resolve: () => void,
    reject: () => void
  ): boolean => {
    return (
      this.middlewares.get(step.name)?.onPrev?.(step, resolve, reject) ?? true
    );
  };

  add = (name: string, middleware: WizzardRoute["validators"]) => {
    this.middlewares.set(name, middleware);
  };
  get = (name: string) => {
    return this.middlewares.get(name);
  };
  execute = ({
    command,
    step,
    resolve,
    reject,
  }: {
    command: WizardCommand;
    step: IStep;
    resolve: () => void;
    reject: () => void;
  }): boolean => {
    let response = true;
    if (command === WIZARD_COMMANDS.NEXT) {
      response = this.onNextCommand(step, resolve, reject);
    }
    if (command === WIZARD_COMMANDS.PREV) {
      response = this.onPrevCommand(step, resolve, reject);
    }
    return response;
  };
}

export { MiddlewareManager };
