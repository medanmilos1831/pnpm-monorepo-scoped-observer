import { createMachine } from "../scoped-observer-state-machine";
import { Api } from "./Api";

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
   * API instance containing methods to control the wizzard navigation.
   * All methods use silent fail behavior - invalid operations do nothing.
   */
  api: Api;

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

    // Initialize basic properties
    this.name = name;
    this.steps = availableSteps;
    this.stepsConfig = config.steps;
    this.infinite = config.infinite || false;
    this.onChange = config.onChange;

    // Initialize step state
    this.currentStep = config.initStep;
    this.activeStep = config.initStep;
    this.currentStepIndex = this.steps.indexOf(this.currentStep);

    // Initialize navigation properties
    this.isFirst = this.currentStepIndex === 0;
    this.isLast = this.currentStepIndex === this.steps.length - 1;
    this.nextStep = this.steps.length > 1 ? this.steps[1] : this.steps[0];
    this.prevStep = this.steps[0];

    // Create API instance
    this.api = new Api(this);

    // Create state machine transitions
    const transitions: any = {};
    this.steps.forEach((step, index) => {
      // Create direct transitions to all steps
      const directTransitions: any = {};
      this.steps.forEach((targetStep) => {
        directTransitions[targetStep] = targetStep;
      });

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
          ...directTransitions, // ← Direktne tranzicije na sve step-ove
          RESET: config.initStep,
        },
      };
    });
    // Create and initialize state machine
    this.machine = createMachine({
      init: config.initStep,
      transition: transitions,
    });
  }

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
    // Create state machine transitions
    const transitions: any = {};
    this.steps.forEach((step, index) => {
      // Create direct transitions to all steps
      const directTransitions: any = {};
      this.steps.forEach((targetStep) => {
        directTransitions[targetStep] = targetStep;
      });

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
          ...directTransitions, // ← Direktne tranzicije na sve step-ove
          RESET: config.initStep,
        },
      };
    });

    // Create and initialize state machine
    this.machine = createMachine({
      init: this.currentStep,
      transition: transitions,
    });
    this.onChange = config.onChange;
  }
}
export { WizzardInstance };
