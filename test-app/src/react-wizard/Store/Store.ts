import { createScopedObserver } from "@scoped-observer/core";
import {
  WIZARD_STORE_SCOPE,
  WizardStoreEvents,
  type IWizardConfig,
} from "../types";
import { entityFn } from "./entity";

class Store {
  private _observer = createScopedObserver([
    {
      scope: WIZARD_STORE_SCOPE,
    },
  ]);
  subscribe = (eventName: string, callback: (payload: any) => void) => {
    return this._observer.subscribe({
      scope: WIZARD_STORE_SCOPE,
      eventName,
      callback,
    });
  };
  entities = new Map<string, ReturnType<typeof entityFn>>();
  getEntity = (id: string) => {
    return this.entities.get(id)!;
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
    this._observer.dispatch({
      scope: WIZARD_STORE_SCOPE,
      eventName: `${WizardStoreEvents.CREATE_WIZARD}-${id}`,
      payload: {
        id,
      },
    });
  };
  createEntity = (props: IWizardConfig) => {
    if (!this.entities.has(props.id)) {
      this.entities.set(
        props.id,
        entityFn(props, this._observer, this.entities)
      );
    }
    return this.getEntity(props.id)!;
  };
}

export { Store };
