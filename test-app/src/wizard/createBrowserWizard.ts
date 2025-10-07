import { createElement, type PropsWithChildren } from "react";
import { createWizardClient } from "./createWizardClient";
import type { IStepProps, IWizardConfig, IWizardStepsConfig } from "./types";
import { Wizard } from "./react-intergation/WizardProvider";
import { WizardStep } from "./react-intergation/WizardStep";

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
        Wizard,
        {
          wizard,
          disconnect,
        },
        children
      );
    },
    WizardStep: ({ children, ...props }: PropsWithChildren<IStepProps>) => {
      return createElement(WizardStep, props, children);
    },
    logGarage: () => {
      // Debug method - can be enabled if needed
    },
  };
};

export { createBrowserWizard };
