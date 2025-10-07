import { createElement, type PropsWithChildren } from "react";
import { createWizardClient } from "./createWizardClient";
import type { IWizardConfig, IWizardStepsConfig } from "./types";
import { WizardProvider } from "./react-intergation/WizardProvider";

const createBrowserWizard = () => {
  const garage = new Map<
    string,
    {
      wizard: ReturnType<typeof createWizardClient>;
      disconnect: () => void;
    }
  >();
  return {
    Wizard: ({
      name,
      config,
      wizardStepsConfig,
      children,
    }: PropsWithChildren<{
      name: string;
      config: IWizardConfig;
      wizardStepsConfig: IWizardStepsConfig;
    }>) => {
      let item = garage.get(name);
      if (!item) {
        garage.set(name, {
          wizard: createWizardClient(config, wizardStepsConfig, name),
          disconnect: () => {
            garage.delete(name);
          },
        });
        item = garage.get(name)!;
      }
      const { wizard, disconnect } = item;
      return createElement(
        WizardProvider,
        {
          wizard,
          disconnect,
          getWizard: (wizardName?: string) =>
            garage.get(wizardName ? wizardName : name)!.wizard,
        },
        children
      );
    },
    logGarage: () => {
      // console.log(garage);
    },
  };
};

export { createBrowserWizard };
