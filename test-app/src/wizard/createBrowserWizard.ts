import { createElement, type PropsWithChildren } from "react";
import { Store } from "./Store";
import { WizardProvider, WizardStep } from "./react-intergation";

import { createClient } from "./Client/createClient";
import { Observer } from "./Observer";
import { Step, Wizard, type IWizardConfig } from "./Wizard";

const createBrowserWizard = () => {
  const store = new Store();
  const observer = new Observer();
  const client = createClient(observer);
  return {
    Wizard: ({
      children,
      onReset,
      onFinish,
      renderOnFinish,
      ...props
    }: PropsWithChildren<IWizardConfig>) => {
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
          onReset,
          onFinish,
          renderOnFinish,
        },
        children
      );
    },
    WizardStep,
    getClient: (id: string) => {
      let entity = store.getSlice(id);
      if (!entity) {
        throw new Error(`Wizard with id ${id} not found`);
      }
      return client(entity);
    },
  };
};

export { createBrowserWizard };
