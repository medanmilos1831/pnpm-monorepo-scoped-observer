import { Observer } from "../Observer";
import type { IOnMiddlewareNextPreviousParams } from "../react-intergation/types";
import { WizardInternalEvents, WizardCommands, WizardEvents } from "../types";
import type { Step, Wizard } from "../Wizard";
import { onNextMiddleware, onPreviousMiddleware } from "./middleware";

export function createClient({ wizard, step }: { wizard: Wizard; step: Step }) {
  const observer = new Observer();

  function resolve(
    toStep: string,
    command: WizardCommands.NEXT | WizardCommands.PREVIOUS
  ) {
    if (command === WizardCommands.NEXT) {
      if (step.middlewareOnNext) {
        onNextMiddleware(observer, wizard);
      }
    }
    if (command === WizardCommands.PREVIOUS) {
      if (step.middlewareOnPrevious) {
        onPreviousMiddleware(observer, wizard);
      }
    }
    observer.dispatch(
      command === WizardCommands.NEXT
        ? WizardEvents.ON_NEXT
        : WizardEvents.ON_PREVIOUS,
      {
        activeStep: wizard.activeStep,
        toStep,
      }
    );
    wizard.changeStep(toStep);
    observer.dispatch(WizardEvents.ON_STEP_CHANGE);
  }

  function handleValidation(
    command: WizardCommands,
    result: string,
    obj?: any
  ) {
    if (step.hasValidation) {
      observer.dispatch(WizardInternalEvents.ON_VALIDATE, {
        command,
        activeStep: wizard.activeStep,
        toStep: result,
        resolve: () => {
          resolve(result, command);
        },
        ...obj,
      });
      return true;
    }
    return false;
  }

  function next(obj?: { actionType?: string }) {
    const result = wizard.findStep({ command: WizardCommands.NEXT })!;
    if (!result) {
      observer.dispatch(WizardEvents.ON_FINISH);
      return;
    }
    if (handleValidation(WizardCommands.NEXT, result, obj)) {
      return;
    }
    if (step.middlewareOnNext) {
      onNextMiddleware(observer, wizard);
    }
    resolve(result, WizardCommands.NEXT);
  }

  function previous(obj?: {
    actionType?: string;
    middleware?: (params: IOnMiddlewareNextPreviousParams) => void;
  }) {
    const result = wizard.findStep({ command: WizardCommands.PREVIOUS });
    if (!result) return;
    if (handleValidation(WizardCommands.PREVIOUS, result, obj)) {
      return;
    }
    if (step.middlewareOnPrevious) {
      onPreviousMiddleware(observer, wizard);
    }
    resolve(result, WizardCommands.PREVIOUS);
  }

  return {
    next,
    previous,
    reset: () => {
      wizard.steps = [...wizard.__INTERNAL__STEPS];
      wizard.changeStep(wizard.__INTERNAL__ACTIVE_STEP);
      observer.dispatch(WizardEvents.ON_RESET);
      observer.dispatch(WizardEvents.ON_STEP_CHANGE);
    },
    getActiveStep: () => {
      return wizard.activeStep;
    },
    getSteps: () => {
      return wizard.steps;
    },
    getWizardId: () => {
      return wizard.id;
    },
    goToStep: (step: string) => {
      const currentStepIndex = wizard.steps.indexOf(wizard.activeStep);
      const targetStepIndex = wizard.steps.indexOf(step);

      const command =
        targetStepIndex > currentStepIndex
          ? WizardCommands.NEXT
          : WizardCommands.PREVIOUS;
      if (command === WizardCommands.NEXT) {
        next();
      } else {
        previous();
      }
    },
    isLast: () => {
      return wizard.isLast;
    },
    isFirst: () => {
      return wizard.isFirst;
    },
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe(eventName, callback);
    },
  };
}
