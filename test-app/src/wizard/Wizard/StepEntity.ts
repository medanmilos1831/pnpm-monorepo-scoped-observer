class StepEntity {
  hasValidation: boolean = false;
  onNext: boolean = false;
  onPrevious: boolean = false;

  setStepDefinition = (definition: {
    hasValidation: boolean;
    onNext: boolean;
    onPrevious: boolean;
  }) => {
    this.hasValidation = definition.hasValidation;
    this.onNext = definition.onNext;
    this.onPrevious = definition.onPrevious;
  };
}

export { StepEntity };
