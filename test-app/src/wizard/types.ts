export enum WizardCommands {
  NEXT = "next",
  PREVIOUS = "previous",
}
export enum WizardEvents {
  ON_NEXT = "onNext",
  ON_PREVIOUS = "onPrevious",
  ON_STEP_CHANGE = "onStepChange",
  ON_FINISH = "onFinish",
  ON_RESET = "onReset",
}

export enum IWizardInternalEvents {
  ON_VALIDATE = "onValidate",
  ON_MIDDLEWARE = "onMiddleware",
}
