import { createElement, type PropsWithChildren } from "react";
import { Hub } from "./Hub";
import { WizardProvider, WizardStep } from "./react-intergation";

import { Observer } from "./Observer";
import { createClient } from "./Client/createClient";
import { Wizard, type IWizardConfig } from "./Wizard";

const createBrowserWizard = () => {
  const hub = new Hub();
  const observer = new Observer();
  const client = createClient(observer);
  return {
    Wizard: ({ children, ...props }: PropsWithChildren<IWizardConfig>) => {
      const { disconnect } = hub.setup(new Wizard(props));
      return createElement(
        WizardProvider,
        {
          disconnect,
          client: client(hub.getEntity(props.id)!),
        },
        children
      );
    },
    WizardStep,
    getClient: client,
  };
};

export { createBrowserWizard };
