import { WizardCommands, type IMeta } from "../types";
import type { Wizard } from "./Wizard";

class Client {
  // Public API methods as fields
  next: (params?: IMeta) => any;
  prev: (params?: IMeta) => any;
  reset: () => any;
  navigateToStep: (stepName: string) => any;

  // Observer API as fields
  subscribe: any;
  interceptor: any;

  // Getters as fields
  getActiveStep: () => any;
  getIsLast: () => boolean;
  getIsFirst: () => boolean;
  getActiveSteps: () => any;
  getStatus: () => any;

  constructor(wizard: Wizard) {
    // Initialize all methods as fields
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
    this.subscribe = wizard.observer.subscribe;
    this.interceptor = wizard.observer.eventInterceptor;

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
