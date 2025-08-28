import { useEffect, useState } from "react";
import { WizzardInstance } from "./WizzardInstance";
import { Api } from "./Api";
import { createOnChangeObject } from "./utils";

import type {
  WizzardHandlerProps,
  WizzardConfig,
  UseWatchReturn,
  WizzardData,
} from "./types";
import { Handlers } from "./Handlers";

/**
 * Creates a wizzard manager with predefined keys for type-safe wizzard instances.
 * Each wizzard instance manages its own step progression and state.
 *
 * @template T - A readonly array of string keys that define valid wizzard names
 * @param config - Configuration object containing the valid wizzard keys
 * @returns An object with methods to create and manage wizzard instances
 *
 * @example
 * ```typescript
 * const wizzard = createWizzard({
 *   keys: ["wizardOne", "wizardTwo"] as const
 * });
 *
 * // TypeScript will only allow these names
 * const instance = wizzard.useWizzard("wizardOne", config);
 * ```
 */
const createWizzard = <T extends readonly string[]>(config: { keys: T }) => {
  const items: Map<T[number], { wizzard: WizzardInstance; api: Api }> =
    new Map();
  const handlers = new Handlers();
  return {
    /**
     * Creates a wizzard instance for the specified name.
     * Each call to this hook creates a new wizzard instance if it doesn't exist.
     *
     * @param name - The wizzard name (must be one of the defined keys)
     * @param config - Configuration object with initial step and step definitions
     * @returns API object with navigation methods (nextStep, prevStep, goToStep, reset)
     *
     * @example
     * ```typescript
     * const wizard = wizzard.useWizzard("wizardOne", {
     *   activeStep: "one",
     *   steps: {
     *     one: { element: () => <div>Step One</div> },
     *     two: { element: () => <div>Step Two</div> }
     *   }
     * });
     * ```
     */
    useWizzard: (name: T[number], config: WizzardConfig) => {
      const [state] = useState(() => {
        let wizzard = new WizzardInstance(name, { ...config });
        const api = new Api(wizzard, handlers);
        items.set(name, {
          wizzard,
          api,
        });
        return {
          wizzard,
          api,
        };
      });

      useEffect(() => {
        return () => {
          items.delete(name);
        };
      }, []);

      return state.api;
    },

    /**
     * Render prop component that provides wizzard state and navigation functions.
     * Use this to render UI components that need access to wizzard state.
     *
     * @param props - Component props including name and children render function
     * @returns The rendered children with wizzard state and functions
     *
     * @example
     * ```typescript
     * <wizzard.WizzardHandler name="wizardOne">
     *   {({ currentStep, totalSteps, nextStepFn, prevStepFn }) => (
     *     <div>
     *       <span>Step {currentStep} of {totalSteps}</span>
     *       <button onClick={nextStepFn}>Next</button>
     *       <button onClick={prevStepFn}>Previous</button>
     *     </div>
     *   )}
     * </wizzard.WizzardHandler>
     * ```
     */
    WizzardHandler: ({ children, name }: WizzardHandlerProps) => {
      const item = items.get(name);
      if (!item) {
        return null;
      }

      // Use machine hook to trigger re-renders when state changes
      item.wizzard.machine.useMachine();

      const ElementComponent =
        item.wizzard.stepsConfig[item.wizzard.activeStep]?.element;
      const api = item.api;

      return children({
        name: item.wizzard.name,
        currentStep: item.wizzard.currentStep,
        totalSteps: item.wizzard.steps.length,
        activeStep: item.wizzard.activeStep,
        nextStepName: item.wizzard.nextStepName,
        prevStepName: item.wizzard.prevStepName,
        isFirst: item.wizzard.isFirst,
        isLast: item.wizzard.isLast,
        nextStepFn: () => api.nextStep(),
        prevStepFn: () => api.prevStep(),
        goToStep: (step: string) => api.goToStep(step),
        reset: () => api.reset(),
        Element: ElementComponent,
      });
    },

    /**
     * Hook that watches wizzard state and optionally computes derived values.
     * Returns current wizzard state and API methods for reactive updates.
     *
     * @template C - The type of computed values returned by the callback
     * @param name - The wizzard name to watch
     * @param callback - Optional function to compute derived values from wizzard state
     * @returns Object containing wizzard state, computed values, and API methods
     * @throws Error if name is invalid
     *
     * @example
     * ```typescript
     * // Basic usage
     * const { activeStep, currentStep, totalSteps } = wizzard.useWatch("wizardOne");
     *
     * // With computed values
     * const { activeStep, callbackValue } = wizzard.useWatch("wizardOne",
     *   (activeStep, currentStep, totalSteps) => ({
     *     progress: Math.round((currentStep / totalSteps) * 100),
     *     isLastStep: currentStep === totalSteps
     *   })
     * );
     * ```
     */

    useWatch: <C = undefined>(
      name: T[number],
      callback?: (wizzardData: WizzardData) => C
    ): UseWatchReturn<C> => {
      const item = items.get(name);
      if (!item) {
        return null as any; // Silent fail - returns null instead of an error
      }

      item.wizzard.machine.useMachine();

      // Create the same rest object as onChange using utility function
      const rest = createOnChangeObject(item.wizzard as any);
      const api = item.api;
      return {
        activeStep: item.wizzard.activeStep,
        currentStep: item.wizzard.currentStep,
        totalSteps: item.wizzard.steps.length,
        isFirst: item.wizzard.isFirst,
        isLast: item.wizzard.isLast,
        nextStep: () => api.nextStep(),
        prevStep: () => api.prevStep(),
        goToStep: (step: string) => api.goToStep(step),
        reset: () => api.reset(),
        callbackValue: callback ? callback(rest) : null,
      } as any;
    },

    /**
     * Gets a wizzard instance by name for direct access.
     * Useful when you need to access wizzard methods outside of React components.
     *
     * @param name - The wizzard name to retrieve
     * @returns The wizzard instance or throws error if not found
     *
     * @example
     * ```typescript
     * const instance = wizzard.getItem("wizardOne");
     * instance.nextStep();
     * ```
     */
    getItem: (name: T[number]) => {
      const item = items.get(name);
      if (!item) {
        throw new Error(
          `[Wizzard] Wizzard with name "${name}" not found. Available keys: [${Array.from(
            config.keys
          ).join(", ")}]`
        );
      }
      return item;
    },
  };
};

export { createWizzard };
