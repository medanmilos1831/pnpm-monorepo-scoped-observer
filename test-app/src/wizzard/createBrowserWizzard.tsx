import { createWizzard } from "./createWizzard";
import type { IWizzardConfig } from "./types";

const createBrowserWizzard = () => {
  const store = new Map<string, any>();

  const refCount = new Map<string, number>();

  return {
    createWizzard: (config: IWizzardConfig) => {
      let wizzard = store.get(config.name);
      if (!wizzard) {
        wizzard = createWizzard(config);
        store.set(config.name, wizzard);
        refCount.set(config.name, 0);
      }
      refCount.set(config.name, (refCount.get(config.name) || 0) + 1);
      const { subscribe, getPayload } = wizzard;
      return {
        disconnect: () => {
          return () => {
            const currentCount = refCount.get(config.name) || 0;
            if (currentCount <= 1) {
              // Last reference - remove engine completely
              store.delete(config.name);
              refCount.delete(config.name);
            } else {
              // Decrement reference count
              refCount.set(config.name, currentCount - 1);
            }
          };
        },
        subscribe,
        getActiveStep: () => {
          return wizzard.activeStep;
        },
        getVisibleSteps: () => {
          return wizzard.visibleSteps;
        },
      };
    },
    setCompleted: (name: string, isCompleted: boolean) => {
      let wizzard = store.get(name);
      wizzard.activeStep.isCompleted = isCompleted;
      wizzard.dispatch({
        scope: "wizzard",
        eventName: "wizzard-event",
        payload: {
          value: isCompleted,
        },
      });
    },
    nextStep: (name: string) => {
      let wizzard = store.get(name);
      wizzard.dispatch({
        scope: "wizzard",
        eventName: "wizzard-event",
        payload: "nextStep",
      });
    },
    prevStep: (name: string) => {
      let wizzard = store.get(name);
      wizzard.dispatch({
        scope: "wizzard",
        eventName: "wizzard-event",
        payload: "prevStep",
      });
    },
  };
};

export { createBrowserWizzard };
