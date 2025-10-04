import { createWizardClient } from "./createWizardClient";

const createBrowserWizard = () => {
  const garage = new Map<
    string,
    {
      wizard: ReturnType<typeof createWizardClient>;
      disconnect: () => void;
    }
  >();
  return {
    getWizard: (name: string) => {
      return garage.get(name);
    },
    getGarage: () => {
      return garage;
    },
  };
};

export { createBrowserWizard };
