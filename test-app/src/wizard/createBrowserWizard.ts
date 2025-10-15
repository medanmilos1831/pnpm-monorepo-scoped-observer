import { createElement, type PropsWithChildren } from "react";
import { Store } from "./Store";
import { WizardProvider, WizardStep } from "./react-intergation";

import { createClient } from "./Client/createClient";
import { Observer } from "./Observer";
import { Step, Wizard, type IWizardConfig } from "./Wizard";

const createBrowserWizard = () => {
  // const store = new Store();
  // const observer = new Observer();
  // const client = createClient(observer);
  return new Store();
};

export { createBrowserWizard };
