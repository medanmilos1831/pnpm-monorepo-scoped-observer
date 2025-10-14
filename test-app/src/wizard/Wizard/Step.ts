class Step {
  hasValidation: boolean = false;
  onNext: boolean = false;
  onPrevious: boolean = false;
  middleware: boolean = false;

  setStepDefinition = (definition: {
    hasValidation: boolean;
    onNext: boolean;
    onPrevious: boolean;
    middleware: boolean;
  }) => {
    this.hasValidation = definition.hasValidation;
    this.onNext = definition.onNext;
    this.onPrevious = definition.onPrevious;
    this.middleware = definition.middleware;
  };
}

export { Step };
