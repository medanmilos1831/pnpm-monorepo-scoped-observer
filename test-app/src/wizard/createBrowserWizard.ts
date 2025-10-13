import { createElement, type PropsWithChildren } from "react";
import { Hub } from "./core/Hub";
import { Wizard } from "./core/Wizard";
import { WizardProvider } from "./react-intergation";
import type { IWizard } from "./types";

const createBrowserWizard = () => {
  const hub = new Hub();
  return {
    WizardProvider: ({ children, ...props }: PropsWithChildren<IWizard>) => {
      if (!hub.getEntity(props.id)) {
        hub.addEntity(new Wizard(props));
      }
      const wizard = hub.getEntity(props.id);
      return createElement(
        WizardProvider,
        {
          wizard,
        },
        children
      );
    },
  };
};

export { createBrowserWizard };
