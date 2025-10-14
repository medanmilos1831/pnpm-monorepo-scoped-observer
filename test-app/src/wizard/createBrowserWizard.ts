import { createElement, type PropsWithChildren } from "react";
import { Store } from "./Store";
import { WizardProvider, WizardStep } from "./react-intergation";

import { Observer } from "./Observer";
import { createClient } from "./Client/createClient";
import { Step, Wizard, type IWizardConfig } from "./Wizard";

const createBrowserWizard = () => {
  const store = new Store();
  const observer = new Observer();
  const client = createClient(observer);
  return {
    Wizard: ({ children, ...props }: PropsWithChildren<IWizardConfig>) => {
      const { disconnect, slice } = store.createSlice(props.id, () => {
        return {
          wizard: new Wizard(props),
          step: new Step(),
        };
      });
      const { wizard, step } = slice;
      return createElement(
        WizardProvider,
        {
          disconnect,
          wizard,
          step,
          client: client({ wizard, step }),
        },
        children
      );
    },
    WizardStep,
    getClient: client,
  };
};

export { createBrowserWizard };
