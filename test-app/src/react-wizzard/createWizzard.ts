import { createElement, useEffect, useRef, useState } from "react";
import { WizzardInstance } from "./WizzardInstance";
import type { WizzardHandlerProps, WizzardConfig } from "./types";

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
  const items: Map<T[number], WizzardInstance> = new Map();

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
     *   initStep: "one",
     *   steps: {
     *     one: { element: () => <div>Step One</div> },
     *     two: { element: () => <div>Step Two</div> }
     *   }
     * });
     * ```
     */
    useWizzard: (name: T[number], config: WizzardConfig) => {
      const isInitialRender = useRef(true);

      const [state] = useState(() => {
        let wizzard = new WizzardInstance(name, { ...config });
        items.set(name, wizzard);
        return wizzard;
      });
      if (!isInitialRender.current) {
        state.update(name, config);
      }
      if (isInitialRender.current) {
        isInitialRender.current = false;
      }

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

      item.machine.useMachine();
      const ElementComponent = item.stepsConfig[item.activeStep]?.element;

      return children({
        name: item.name, // ← NOVO: wizzard name
        currentStep: item.currentStep,
        totalSteps: item.steps.length,
        activeStep: item.activeStep,
        nextStep: item.nextStep,
        prevStep: item.prevStep,
        isFirst: item.isFirst,
        isLast: item.isLast,
        nextStepFn: () => item.api.nextStep(),
        prevStepFn: () => item.api.prevStep(),
        goToStep: (step: string) => item.api.goToStep(step),
        reset: () => item.api.reset(),
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
      callback?: (
        activeStep: string,
        currentStep: string,
        totalSteps: number
      ) => C
    ) => {
      // Validation: Check if name is provided
      if (!name || typeof name !== "string") {
        throw new Error("[Wizzard] Wizzard name must be a valid string");
      }

      // Validation: Check if name is one of the allowed keys
      if (!config.keys.includes(name)) {
        throw new Error(
          `[Wizzard] Invalid wizzard name "${name}". Allowed names: [${Array.from(
            config.keys
          ).join(", ")}]`
        );
      }

      const item = items.get(name);
      if (!item) {
        return null; // Silent fail - vraća null umesto error-a
      }

      item.machine.useMachine();

      let callbackValue: C | null = null;
      if (callback) {
        try {
          callbackValue = callback(
            item.activeStep,
            item.currentStep,
            item.steps.length
          );
        } catch (error) {
          console.error(
            `[Wizzard] Error in useWatch callback for "${name}":`,
            error
          );
          callbackValue = null;
        }
      }

      return {
        activeStep: item.activeStep,
        currentStep: item.currentStep,
        totalSteps: item.steps.length,
        isFirst: item.isFirst,
        isLast: item.isLast,
        ...item.api,
        callbackValue,
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
     * instance.api.nextStep();
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
