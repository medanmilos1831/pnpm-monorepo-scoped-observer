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
    const availableSteps = Object.keys(config.steps);
    if (!availableSteps.includes(config.initStep)) {
      throw new Error(
        `[Wizzard] initStep "${
          config.initStep
        }" not found in steps. Available steps: [${availableSteps.join(", ")}]`
      );
    }

    this.name = name;
    this.steps = availableSteps;
    this.stepsConfig = config.steps; // ← NOVO: čuvamo originalnu konfiguraciju
    this.currentStep = config.initStep;
    this.activeStep = config.initStep;
    this.nextStep = this.steps.length > 1 ? this.steps[1] : this.steps[0];
    this.prevStep = this.steps[0];
    this.isFirst = true;
    this.isLast = this.steps.length === 1;
    this.currentStepIndex = this.steps.indexOf(this.currentStep);
    this.infinite = config.infinite || false; // ← NOVO: infinite loop mode opcija

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

    console.log("transitions", transitions);

    this.machine = createMachine({
      init: config.initStep,
      transition: transitions,
    });
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

      // Ažuriraj sve properties
      this.isFirst = this.currentStepIndex === 0;
      this.isLast = this.currentStepIndex === this.steps.length - 1;
      this.nextStep = this.isLast
        ? this.activeStep
        : this.steps[this.currentStepIndex + 1];
      this.prevStep = this.isFirst
        ? this.activeStep
        : this.steps[this.currentStepIndex - 1];

      this.machine.send({ type: "NEXT" });
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
}

export { WizzardInstance };
