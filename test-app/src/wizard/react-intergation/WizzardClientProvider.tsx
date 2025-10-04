import { createContext, useState, type PropsWithChildren } from "react";
import type { createBrowserWizard } from "../createBrowserWizard";
import { createWizardClient } from "../createWizardClient";
import type { IWizardConfig, IWizardStepsConfig } from "../types";

const WizzardClientContext = createContext<
  | {
      getWizard: (name: string) =>
        | {
            wizard: ReturnType<typeof createWizardClient>;
            disconnect: () => void;
          }
        | undefined;
      getGarage: () => Map<
        string,
        {
          wizard: ReturnType<typeof createWizardClient>;
          disconnect: () => void;
        }
      >;
      ensureWizard: any;
    }
  | undefined
>(undefined);

const WizzardClientProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: ReturnType<typeof createBrowserWizard> }>) => {
  const [state, _] = useState(() => {
    const refCount = new Map<string, number>();
    return {
      ensureWizard: (
        name: string,
        config: IWizardConfig,
        wizardStepsConfig: IWizardStepsConfig
      ) => {
        let wizard = value.getWizard(name);
        if (!wizard) {
          value.getGarage().set(name, {
            wizard: createWizardClient(config, wizardStepsConfig, name),
            disconnect: () => {
              const currentCount = refCount.get(name) || 0;
              if (currentCount <= 1) {
                // Last reference - remove engine completely
                value.getGarage().delete(name);
                refCount.delete(name);
              } else {
                // Decrement reference count
                refCount.set(name, currentCount - 1);
              }

              // console.log("disconnect", name, this);
            },
          });
          refCount.set(name, 0);
          wizard = value.getGarage().get(name)!;
        }
        return wizard;
      },
    };
  });
  return (
    <WizzardClientContext.Provider
      value={{
        getWizard: value.getWizard,
        getGarage: value.getGarage,
        ensureWizard: state.ensureWizard,
      }}
    >
      {children}
    </WizzardClientContext.Provider>
  );
};

export { WizzardClientContext, WizzardClientProvider };
