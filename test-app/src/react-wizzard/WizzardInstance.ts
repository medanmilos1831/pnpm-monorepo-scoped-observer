import type { WizzardConfig, WizzardData } from "./types";
import { createWizzardMachine, validateWizzardConfig } from "./utils";

class WizzardInstance {
  name: string;
  machine;
  steps: string[];
  stepsConfig: { [key: string]: { element: React.ComponentType<any> } };
  currentStep: string;
  activeStep: string;
  nextStepName: string;
  prevStepName: string;
  isFirst: boolean;
  isLast: boolean;
  currentStepIndex: number;
  infinite: boolean;
  onChange?: (data: WizzardData) => void;

  /**
   * Creates a new wizzard instance with the specified configuration.
   * @param name - Unique identifier for this wizzard instance
   * @param config - Configuration object containing initial step and step definitions
   * @throws Error if configuration is invalid
   */
  constructor(name: string, config: WizzardConfig) {
    // Use utility function for validation
    validateWizzardConfig(name, config);

    // Initialize basic properties
    this.name = name;
    this.steps = Object.keys(config.stepsConfig);
    this.stepsConfig = config.stepsConfig;
    this.infinite = config.infinite || false;
    this.onChange = config.onChange;

    // Initialize step state
    this.currentStep = config.activeStep;
    this.activeStep = config.activeStep;
    this.currentStepIndex = this.steps.indexOf(this.currentStep);

    // Initialize navigation properties
    this.isFirst = this.currentStepIndex === 0;
    this.isLast = this.currentStepIndex === this.steps.length - 1;
    this.nextStepName = this.steps.length > 1 ? this.steps[1] : this.steps[0];
    this.prevStepName = this.steps[0];

    // Create and initialize state machine using utility function
    this.machine = createWizzardMachine(
      this.steps,
      config.activeStep,
      config.activeStep
    );
  }
}
export { WizzardInstance };
