class Step {
  hasValidation: boolean = false;
  onNext: boolean = false;
  onPrevious: boolean = false;
  middlewareOnNext: boolean = false;
  middlewareOnPrevious: boolean = false;

  setStepDefinition = (definition: {
    hasValidation: boolean;
    onNext: boolean;
    onPrevious: boolean;
    middlewareOnNext: boolean;
    middlewareOnPrevious: boolean;
  }) => {
    this.hasValidation = definition.hasValidation;
    this.onNext = definition.onNext;
    this.onPrevious = definition.onPrevious;
    this.middlewareOnNext = definition.middlewareOnNext;
    this.middlewareOnPrevious = definition.middlewareOnPrevious;
  };
}

export { Step };
