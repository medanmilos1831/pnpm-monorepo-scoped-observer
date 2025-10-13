import type { IWizard } from "../Wizard/types";

export function clientService(entity: IWizard) {
  return {
    findStep: () => {
      return "PERA";
    },
  };
}
