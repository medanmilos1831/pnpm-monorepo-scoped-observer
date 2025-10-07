import { createElement, type PropsWithChildren } from "react";
import { Client, WizardEntity } from "./core";
import { WizardProvider } from "./react-intergation/WizardProvider";
import { WizardStep } from "./react-intergation/WizardStep";
import type { IWizardConfig, IWizardStepsConfig } from "./types";

const createBrowserWizard = () => {
  const garage = new Map<
    string,
    {
      wizard: Client;
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
          wizard: new Client(new WizardEntity(config, wizardStepsConfig, name)),
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
        },
        children
      );
    },
    WizardStep,
    logGarage: () => {
      // Debug method - can be enabled if needed
    },
    getWizard: (name: string) => {
      return garage.get(name)?.wizard;
    },
  };
};

export { createBrowserWizard };
