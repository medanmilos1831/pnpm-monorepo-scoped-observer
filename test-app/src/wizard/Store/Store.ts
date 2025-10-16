import { StepModule, WizardModule, type IWizardConfig } from "./Entity";
import { createClient } from "./Entity/Client/createClient";
import type { IEntity } from "./types";

class Store {
  entities = new Map<string, IEntity>();
  getEntity = (id: string) => {
    return this.entities.get(id)!;
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
  };
  getClient = (id: string) => {
    return this.entities.get(id)!.client;
  };
  createEntity = (props: IWizardConfig) => {
    if (!this.entities.has(props.id)) {
      const wizard = new WizardModule(props);
      const step = new StepModule();
      const client = createClient({ wizard, step });
      this.entities.set(props.id, {
        wizard,
        step,
        client,
      });
    }
    return {
      disconnect: () => {
        this.removeEntity(props.id);
      },
    };
  };
}

export { Store };
