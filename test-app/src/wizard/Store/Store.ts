import { SCROLLIUM_STORE_SCOPE } from "../../scrollium/Store/types";
import {
  StepModule,
  WizardModule,
  type IWizardConfig,
  createClient,
  type IEntity,
} from "./Entity";
import { WizardStoreEvents } from "./types";
import { createScopedObserver } from "@scoped-observer/core";

class Store {
  private _observer = createScopedObserver([
    {
      scope: SCROLLIUM_STORE_SCOPE,
    },
  ]);
  subscribe = (eventName: string, callback: (payload: any) => void) => {
    return this._observer.subscribe({
      scope: SCROLLIUM_STORE_SCOPE,
      eventName,
      callback,
    });
  };
  entities = new Map<string, IEntity>();
  getEntity = (id: string) => {
    return this.entities.get(id)!;
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
    this._observer.dispatch({
      scope: SCROLLIUM_STORE_SCOPE,
      eventName: `${WizardStoreEvents.CREATE_WIZARD}-${id}`,
      payload: {
        id,
      },
    });
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
    return () => {
      this._observer.dispatch({
        scope: SCROLLIUM_STORE_SCOPE,
        eventName: `${WizardStoreEvents.CREATE_WIZARD}-${props.id}`,
        payload: {
          id: props.id,
        },
      });
      return () => {
        this.removeEntity(props.id);
      };
    };
  };
}

export { Store };
