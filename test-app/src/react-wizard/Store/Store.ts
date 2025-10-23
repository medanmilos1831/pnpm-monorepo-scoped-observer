import { createScopedObserver } from "@scoped-observer/core";

class Store {
  private _observer = createScopedObserver([
    {
      scope: "WIZARD_STORE_SCOPE",
    },
  ]);
  subscribe = (eventName: string, callback: (payload: any) => void) => {
    return this._observer.subscribe({
      scope: "WIZARD_STORE_SCOPE",
      eventName,
      callback,
    });
  };
  entities = new Map<string, any>();
  getEntity = (id: string) => {
    return this.entities.get(id)!;
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
    this._observer.dispatch({
      scope: "WIZARD_STORE_SCOPE",
      eventName: `${"WizardStoreEvents.CREATE_WIZARD"}-${id}`,
      payload: {
        id,
      },
    });
  };
  getClient = (id: string) => {
    return this.entities.get(id)!.client;
  };
  createEntity = (props: any) => {
    if (!this.entities.has(props.id)) {
      this.entities.set(props.id, {});
    }
  };
}

export { Store };
