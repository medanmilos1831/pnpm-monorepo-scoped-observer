class Step {
  hasValidation: boolean = false;
  onNext: boolean = false;
  onPrevious: boolean = false;
  middleware: ((params: any) => void) | undefined = undefined;

  setStepDefinition = (definition: {
    hasValidation: boolean;
    onNext: boolean;
    onPrevious: boolean;
    middleware: ((params: any) => void) | undefined;
  }) => {
    this.hasValidation = definition.hasValidation;
    this.onNext = definition.onNext;
    this.onPrevious = definition.onPrevious;
    this.middleware = definition.middleware;
  };
}

export { Step };
