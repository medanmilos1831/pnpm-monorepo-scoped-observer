/**
 * API class containing methods to control wizzard navigation.
 * All methods use silent fail behavior - invalid operations do nothing.
 */
export class Api {
  private instance: any;

  constructor(instance: any) {
    this.instance = instance;
  }

  /**
   * Advances to the next step in the sequence.
   * Does nothing if already at the last step.
   */
  nextStep(): void {
    let currentIndex = this.instance.steps.indexOf(this.instance.activeStep);
    if (this.instance.isLast) {
      this.instance.currentStepIndex = this.instance.infinite
        ? 0
        : currentIndex;
    } else {
      this.instance.currentStepIndex = currentIndex + 1;
    }
    this.instance.activeStep =
      this.instance.steps[this.instance.currentStepIndex];
    this.instance.currentStep = this.instance.activeStep;
    this.instance.isFirst = this.instance.currentStepIndex === 0;
    this.instance.isLast =
      this.instance.currentStepIndex === this.instance.steps.length - 1;
    this.instance.nextStep = this.instance.isLast
      ? this.instance.activeStep
      : this.instance.steps[this.instance.currentStepIndex + 1];
    this.instance.prevStep = this.instance.isFirst
      ? this.instance.activeStep
      : this.instance.steps[this.instance.currentStepIndex - 1];
    let { onChange, machine, api, ...rest } = this.instance;
    this.instance.onChange?.(rest);
    this.instance.machine.send({ type: "NEXT" });
  }

  /**
   * Goes back to the previous step in the sequence.
   * Does nothing if already at the first step.
   */
  prevStep(): void {
    let currentIndex = 0;
    currentIndex = this.instance.steps.indexOf(this.instance.activeStep);
    if (this.instance.isFirst) {
      this.instance.currentStepIndex = this.instance.infinite
        ? this.instance.steps.length - 1
        : currentIndex;
    } else {
      this.instance.currentStepIndex = currentIndex - 1;
    }
    this.instance.activeStep =
      this.instance.steps[this.instance.currentStepIndex];
    this.instance.currentStep = this.instance.activeStep;

    // Ažuriraj sve properties
    this.instance.isFirst = this.instance.currentStepIndex === 0;
    this.instance.isLast =
      this.instance.currentStepIndex === this.instance.steps.length - 1;
    this.instance.nextStep = this.instance.isLast
      ? this.instance.activeStep
      : this.instance.steps[this.instance.currentStepIndex + 1];
    this.instance.prevStep = this.instance.isFirst
      ? this.instance.activeStep
      : this.instance.steps[this.instance.currentStepIndex - 1];
    this.instance.machine.send({ type: "PREV" });
    let { onChange, machine, api, ...rest } = this.instance;
    this.instance.onChange?.(rest);
  }

  /**
   * Navigates directly to a specific step.
   * Does nothing if the step does not exist.
   */
  goToStep(step: string): void {
    if (!this.instance.steps.includes(step)) {
      return; // Silent fail - ništa se ne dešava
    }

    const stepIndex = this.instance.steps.indexOf(step);
    this.instance.currentStepIndex = stepIndex;
    this.instance.activeStep = step;
    this.instance.currentStep = step;

    // Ažuriraj sve properties
    this.instance.isFirst = stepIndex === 0;
    this.instance.isLast = stepIndex === this.instance.steps.length - 1;
    this.instance.nextStep =
      stepIndex < this.instance.steps.length - 1
        ? this.instance.steps[stepIndex + 1]
        : this.instance.activeStep;
    this.instance.prevStep =
      stepIndex > 0
        ? this.instance.steps[stepIndex - 1]
        : this.instance.activeStep;

    this.instance.machine.send({
      type: this.instance.currentStep,
      payload: step,
    });
    let { onChange, machine, api, ...rest } = this.instance;
    this.instance.onChange?.(rest);
  }

  /**
   * Resets the wizzard to its initial state.
   */
  reset(): void {
    this.instance.currentStepIndex = 0;
    this.instance.activeStep = this.instance.steps[0];
    this.instance.currentStep = this.instance.steps[0];

    this.instance.isFirst = true;
    this.instance.isLast = this.instance.steps.length === 1;
    this.instance.nextStep =
      this.instance.steps.length > 1
        ? this.instance.steps[1]
        : this.instance.steps[0];
    this.instance.prevStep = this.instance.steps[0];

    this.instance.machine.send({ type: "RESET" });
    let { onChange, machine, api, ...rest } = this.instance;
    this.instance.onChange?.(rest);
  }
}
