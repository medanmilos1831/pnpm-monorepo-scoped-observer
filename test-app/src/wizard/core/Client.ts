import {
  WIZARD_SCOPE,
  WizardCommands,
  WizardEvents,
  type IMeta,
} from "../types";
import { createEventName } from "../utils";
import type { WizardEntity } from "./WizardEntity";

class Client {
  // Public API methods as fields
  next: (params?: IMeta) => any;
  prev: (params?: IMeta) => any;
  reset: () => any;
  navigateToStep: (stepName: string) => any;

  // Observer API as fields
  subscribe: (obj: {
    eventName: `${WizardEvents}`;
    callback: (payload: any) => void;
  }) => () => void;

  // Getters as fields
  getActiveStep: () => any;
  getIsLast: () => boolean;
  getIsFirst: () => boolean;
  getActiveSteps: () => any;
  getStatus: () => any;

  name: string;

  constructor(wizard: WizardEntity) {
    // Initialize all methods as fields
    this.name = wizard.name;
    this.next = (params?: IMeta) => {
      return wizard.executeCommand({
        command: WizardCommands.NEXT,
        params,
      });
    };

    this.prev = (params?: IMeta) => {
      return wizard.executeCommand({
        command: WizardCommands.PREV,
        params,
      });
    };

    this.reset = () => {
      return wizard.reset();
    };

    this.navigateToStep = (stepName: string) => {
      return wizard.navigateToStep(stepName);
    };

    // Observer API
    this.subscribe = ({
      eventName,
      callback,
    }: {
      eventName: `${WizardEvents}`;
      callback: (payload: any) => void;
    }) => {
      return wizard.observer.subscribe({
        eventName: createEventName(this.name, eventName),
        callback: () => {
          callback({
            getActiveStep: this.getActiveStep,
            getIsLast: this.getIsLast,
            getIsFirst: this.getIsFirst,
            getActiveSteps: this.getActiveSteps,
            getStatus: this.getStatus,
          });
        },
      });
    };

    // Getters
    this.getActiveStep = () => {
      return wizard.currentStep;
    };

    this.getIsLast = () => {
      return wizard.isLast;
    };

    this.getIsFirst = () => {
      return wizard.isFirst;
    };

    this.getActiveSteps = () => {
      return wizard.wizardStepsConfig.activeSteps;
    };

    this.getStatus = () => {
      return wizard.status;
    };
  }
}

export { Client };
