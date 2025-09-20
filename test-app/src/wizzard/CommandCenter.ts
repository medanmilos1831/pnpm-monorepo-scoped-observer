import { WIZARD_COMMANDS, type WizardCommand } from "./constants";

/**
 * Navigation result interface containing command and step information
 * @interface NavigationResult
 */
interface NavigationResult {
  /** The command that was executed */
  command: WizardCommand;
  /** The name of the step to navigate to */
  stepName: string | null;
}

/**
 * CommandCenter handles wizard navigation logic and step transitions
 *
 * This class provides centralized navigation functionality for wizard components,
 * managing next/previous step calculations and command execution.
 *
 * @class CommandCenter
 * @example
 * ```typescript
 * const commandCenter = new CommandCenter();
 * const result = commandCenter.navigator(WIZARD_COMMANDS.NEXT, {
 *   visibleSteps: ['step1', 'step2', 'step3'],
 *   currentIndex: 0
 * });
 * // Returns: { command: 'next', stepName: 'step2' }
 * ```
 */
class CommandCenter {
  /**
   * Calculates the next step name based on current index and visible steps
   *
   * @private
   * @param currentIndex - The current step index in the visible steps array
   * @param visibleSteps - Array of visible step names
   * @returns The next step name or null if no next step available
   *
   * @example
   * ```typescript
   * const nextStep = this.nextStep(0, ['step1', 'step2', 'step3']);
   * // Returns: 'step2'
   *
   * const nextStep = this.nextStep(2, ['step1', 'step2', 'step3']);
   * // Returns: null (last step)
   * ```
   */
  private nextStep = (
    currentIndex: number,
    visibleSteps: string[]
  ): string | null => {
    if (currentIndex === -1 || currentIndex === visibleSteps.length - 1) {
      return null;
    }

    const nextStepName = visibleSteps[currentIndex + 1];
    return nextStepName;
  };

  /**
   * Calculates the previous step name based on current index and visible steps
   *
   * @private
   * @param currentIndex - The current step index in the visible steps array
   * @param visibleSteps - Array of visible step names
   * @returns The previous step name or null if no previous step available
   *
   * @example
   * ```typescript
   * const prevStep = this.prevStep(1, ['step1', 'step2', 'step3']);
   * // Returns: 'step1'
   *
   * const prevStep = this.prevStep(0, ['step1', 'step2', 'step3']);
   * // Returns: null (first step)
   * ```
   */
  private prevStep = (
    currentIndex: number,
    visibleSteps: string[]
  ): string | null => {
    if (currentIndex === -1 || currentIndex === 0) {
      return null;
    }

    const prevStepName = visibleSteps[currentIndex - 1];
    return prevStepName;
  };

  /**
   * Main navigation method that handles step transitions based on command
   *
   * This method processes navigation commands and returns the appropriate step information.
   * It delegates to either nextStep or prevStep based on the command type.
   *
   * @param command - The navigation command (NEXT or PREV)
   * @param params - Navigation parameters
   * @param params.visibleSteps - Array of visible step names
   * @param params.currentIndex - Current step index in the visible steps array
   * @returns NavigationResult object with command and stepName, or null if navigation not possible
   *
   * @example
   * ```typescript
   * const result = commandCenter.navigator(WIZARD_COMMANDS.NEXT, {
   *   visibleSteps: ['step1', 'step2', 'step3'],
   *   currentIndex: 0
   * });
   * // Returns: { command: 'next', stepName: 'step2' }
   *
   * const result = commandCenter.navigator(WIZARD_COMMANDS.PREV, {
   *   visibleSteps: ['step1', 'step2', 'step3'],
   *   currentIndex: 0
   * });
   * // Returns: { command: 'prev', stepName: null }
   * ```
   */
  navigator = (
    command: WizardCommand,
    {
      visibleSteps,
      currentIndex,
    }: { visibleSteps: string[]; currentIndex: number }
  ): NavigationResult => {
    let stepName: string | null = null;

    if (command === WIZARD_COMMANDS.NEXT) {
      stepName = this.nextStep(currentIndex, visibleSteps);
    } else {
      stepName = this.prevStep(currentIndex, visibleSteps);
    }

    return {
      command,
      stepName: stepName,
    };
  };
}

/**
 * Exports the CommandCenter class for use in wizard components
 *
 * @example
 * ```typescript
 * import { CommandCenter } from './CommandCenter';
 *
 * const commandCenter = new CommandCenter();
 * ```
 */
export { CommandCenter };
