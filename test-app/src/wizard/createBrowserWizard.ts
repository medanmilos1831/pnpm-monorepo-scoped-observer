import { createElement, type PropsWithChildren } from "react";
import { Client, WizardEntity } from "./core";
import { WizardProvider } from "./react-intergation/WizardProvider";
import { WizardStep } from "./react-intergation/WizardStep";
import type { IWizardConfig, IWizardStepsConfig } from "./types";
import { Observer } from "./Observer";

const createBrowserWizard = () => {
  const garage = new Map<
    string,
    {
      client: Client;
      disconnect: () => void;
    }
  >();

  const observer = new Observer();

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
      const eventNameBuilder = (eventName: string) => {
        return `${name}.${eventName}`;
      };
      if (!item) {
        garage.set(name, {
          client: new Client(
            new WizardEntity(
              config,
              wizardStepsConfig,
              name,
              observer,
              eventNameBuilder
            )
          ),
          disconnect: () => {
            garage.delete(name);
          },
        });
        item = garage.get(name)!;
      }
      const { client, disconnect } = item;
      return createElement(
        WizardProvider,
        {
          client,
          disconnect,
          eventNameBuilder,
          observer,
        },
        children
      );
    },
    WizardStep,
    logGarage: () => {
      // Debug method - can be enabled if needed
    },
    getWizard: (name: string) => {
      return garage.get(name)?.client;
    },
  };
};

export { createBrowserWizard };
