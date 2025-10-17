import { createScopedObserver } from "@scoped-observer/core";

class UIReferenceStore {
  observer = createScopedObserver([
    {
      scope: "ui-reference-store",
    },
  ]);
  entities = new Map<string, any>();
  getEntity = (id: string) => {
    return this.entities.get(id)!;
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
  };
  getClient = (id: string) => {
    return this.entities.get(id)!.client;
  };
  createEntity = (id: string) => {
    if (!this.entities.has(id)) {
      this.observer.dispatch({
        scope: "ui-reference-store",
        eventName: `createEntity-${id}`,
        payload: {
          id,
        },
      });
      this.entities.set(id, {
        id,
        counter: 0,
        client: {
          increment: () => {
            this.entities.get(id)!.counter++;
          },
          decrement: () => {
            this.entities.get(id)!.counter--;
          },
        },
      });
    }
    return {
      disconnect: () => {
        this.removeEntity(id);
      },
    };
  };
}

export { UIReferenceStore };
