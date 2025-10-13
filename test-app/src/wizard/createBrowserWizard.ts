import { createElement, type PropsWithChildren } from "react";
import { Hub } from "./Hub/Hub";
import { Wizard } from "./Wizard/Wizard";
import { WizardProviderHOC, WizardStep } from "./react-intergation";
import type { IWizard } from "./Wizard/types";
import { Observer } from "./Observer";
import { createClient } from "./Client/createClient";

const createBrowserWizard = () => {
  const hub = new Hub();
  const observer = new Observer();
  const client = createClient(hub, observer);
  return {
    WizardProvider: ({ children, ...props }: PropsWithChildren<IWizard>) => {
      const { disconnect } = hub.setup(new Wizard(props));
      return createElement(
        WizardProviderHOC,
        {
          id: props.id,
          disconnect,
          client: client(props.id),
        },
        children
      );
    },
    WizardStep,
    getClient: client,
  };
};

export { createBrowserWizard };
