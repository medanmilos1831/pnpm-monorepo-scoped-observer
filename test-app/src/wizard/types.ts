export enum WizardCommands {
  NEXT = "next",
  PREVIOUS = "previous",
}
export enum WizardEvents {
  ON_NEXT = "onNext",
  ON_PREVIOUS = "onPrevious",
  ON_STEP_CHANGE = "onStepChange",
  ON_RESET = "onReset",
  ON_FINISH = "onFinish",
}

export enum IWizardInternalEvents {
  ON_VALIDATE = "onValidate",
  ON_MIDDLEWARE_NEXT = "onMiddlewareNext",
  ON_MIDDLEWARE_PREVIOUS = "onMiddlewarePrevious",
}
