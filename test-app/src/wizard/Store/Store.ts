import {
  StepModule,
  WizardModule,
  type IWizardConfig,
  createClient,
  type IEntity,
} from "./Entity";

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
      this.entities.set(wizard.id, {
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
