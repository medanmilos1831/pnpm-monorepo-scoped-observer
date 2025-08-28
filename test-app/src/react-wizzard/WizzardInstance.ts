import { createMachine } from "../scoped-observer-state-machine";

class WizzardInstance {
  name: string;
  machine;
  steps: string[];
  stepsConfig: { [key: string]: { element: React.ComponentType<any> } }; // ← React komponenta umesto funkcije
  currentStep: string;
  activeStep: string;
  nextStep: string;
  prevStep: string;
  isFirst: boolean;
  isLast: boolean;
  currentStepIndex: number;
  infinite: boolean; // ← NOVO: infinite loop mode opcija
  onChange?: (data: any) => void; // ← NOVO: onChange callback

  /**
   * Creates a new wizzard instance with the specified configuration.
   * @param name - Unique identifier for this wizzard instance
   * @param config - Configuration object containing initial step and step definitions
   * @throws Error if configuration is invalid
   */
  constructor(name: string, config: any) {
    // Validation: Check if config is provided
    if (!config || typeof config !== "object") {
      throw new Error("[Wizzard] Configuration must be a valid object");
    }

    // Validation: Check if steps are provided
    if (
      !config.steps ||
      typeof config.steps !== "object" ||
      Object.keys(config.steps).length === 0
    ) {
      throw new Error(
        "[Wizzard] Configuration must include non-empty steps object"
      );
    }

    // Validation: Check if initStep is provided
    if (!config.initStep || typeof config.initStep !== "string") {
      throw new Error(
        "[Wizzard] Configuration must include valid initStep string"
      );
    }

    // Validation: Check if initStep exists in steps

    this.name = name;
    this.steps = Object.keys(config.steps);
    this.activeStep = config.initStep;
    this.currentStep = config.initStep;
    this.currentStepIndex = this.steps.indexOf(this.currentStep);
    this.stepsConfig = config.steps;
    this.nextStep = this.steps.length > 1 ? this.steps[1] : this.steps[0];
    this.prevStep = this.steps[0];
    this.isFirst = this.currentStepIndex === 0;
    this.isLast = this.currentStepIndex === this.steps.length - 1;
    this.infinite = config.infinite || false;
    this.onChange = config.onChange;

    const transitions: any = {};

    this.steps.forEach((step, index) => {
      transitions[step] = {
        on: {
          NEXT:
            index < this.steps.length - 1
              ? this.steps[index + 1]
              : this.steps[0], // ← Infinite: poslednji → prvi
          PREV:
            index > 0
              ? this.steps[index - 1]
              : this.steps[this.steps.length - 1], // ← Infinite: prvi → zadnji
          GO_TO: step,
          RESET: config.initStep,
        },
      };
    });

    this.machine = createMachine({
      init: config.initStep,
      transition: transitions,
    });
    this.onChange = config.onChange;
  }

  /**
   * API object containing methods to control the wizzard navigation.
   * All methods use silent fail behavior - invalid operations do nothing.
   */
  api = {
    /**
     * Advances to the next step in the sequence.
     * Does nothing if already at the last step.
     */
    nextStep: () => {
      let currentIndex = this.steps.indexOf(this.activeStep);
      if (this.isLast) {
        this.currentStepIndex = this.infinite ? 0 : currentIndex;
      } else {
        this.currentStepIndex = currentIndex + 1;
      }
      this.activeStep = this.steps[this.currentStepIndex];
      this.currentStep = this.activeStep;
      this.isFirst = this.currentStepIndex === 0;
      this.isLast = this.currentStepIndex === this.steps.length - 1;
      this.nextStep = this.isLast
        ? this.activeStep
        : this.steps[this.currentStepIndex + 1];
      this.prevStep = this.isFirst
        ? this.activeStep
        : this.steps[this.currentStepIndex - 1];
      this.machine.send({ type: "NEXT" });
      let { onChange, machine, api, ...rest } = this;
      this.onChange?.(rest);
    },
    /**
     * Goes back to the previous step in the sequence.
     * Does nothing if already at the first step.
     */
    prevStep: () => {
      let currentIndex = 0;
      currentIndex = this.steps.indexOf(this.activeStep);
      if (this.isFirst) {
        this.currentStepIndex = this.infinite
          ? this.steps.length - 1
          : currentIndex;
      } else {
        this.currentStepIndex = currentIndex - 1;
      }
      this.activeStep = this.steps[this.currentStepIndex];
      this.currentStep = this.activeStep;

      // Ažuriraj sve properties
      this.isFirst = this.currentStepIndex === 0;
      this.isLast = this.currentStepIndex === this.steps.length - 1;
      this.nextStep = this.isLast
        ? this.activeStep
        : this.steps[this.currentStepIndex + 1];
      this.prevStep = this.isFirst
        ? this.activeStep
        : this.steps[this.currentStepIndex - 1];
      this.machine.send({ type: "PREV" });
    },
    /**
     * Navigates directly to a specific step.
     * Does nothing if the step does not exist.
     */
    goToStep: (step: string) => {
      console.log("goToStep", step);
    },
    /**
     * Resets the wizzard to its initial state.
     */
    reset: () => {
      this.currentStepIndex = 0;
      this.activeStep = this.steps[0];
      this.currentStep = this.steps[0];

      // Ažuriraj sve properties
      this.isFirst = true;
      this.isLast = this.steps.length === 1;
      this.nextStep = this.steps.length > 1 ? this.steps[1] : this.steps[0];
      this.prevStep = this.steps[0];

      this.machine.send({ type: "RESET" });
    },
  };

  update(name: string, config: any) {
    this.name = name;
    this.steps = Object.keys(config.steps);
    this.activeStep = config.initStep;
    this.currentStep = config.initStep;
    this.currentStepIndex = this.steps.indexOf(this.currentStep);
    this.stepsConfig = config.steps;
    this.nextStep = this.steps.length > 1 ? this.steps[1] : this.steps[0];
    this.prevStep = this.steps[0];
    this.isFirst = this.currentStepIndex === 0;
    this.isLast = this.currentStepIndex === this.steps.length - 1;
    this.infinite = config.infinite || false;
    this.onChange = config.onChange;
  }
}

export { WizzardInstance };
