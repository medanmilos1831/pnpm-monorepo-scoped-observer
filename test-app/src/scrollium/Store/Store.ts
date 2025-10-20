import { createClient, type IEntity, ScrollModule } from "./Entity";
import { createScopedObserver } from "@scoped-observer/core";

class Store {
  private _observer = createScopedObserver([
    {
      scope: "scrollium-store",
    },
  ]);
  subscribe = (eventName: string, callback: (payload: any) => void) => {
    return this._observer.subscribe({
      scope: "scrollium-store",
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
      scope: "scrollium-store",
      eventName: `scrollium-store-${id}`,
      payload: {
        id,
      },
    });
  };
  getClient = (id: string) => {
    return this.entities.get(id)!.client;
  };
  createEntity = (props: { id: string }) => {
    if (!this.entities.has(props.id)) {
      const scroll = new ScrollModule(props);
      const client = createClient();
      this.entities.set(scroll.id, {
        client,
      });
    }
    return () => {
      this._observer.dispatch({
        scope: "scrollium-store",
        eventName: `scrollium-store-${props.id}`,
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
