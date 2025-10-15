import type { IEntity } from "./types";

class Store {
  entities = new Map<string, IEntity>();
  getEntity = (id: string) => {
    return this.entities.get(id)!.client;
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
  };
  createEntity = (id: string, entity: () => IEntity) => {
    if (!this.entities.has(id)) {
      this.entities.set(id, entity());
    }
    return {
      entity: this.entities.get(id)!,
      disconnect: () => {
        this.removeEntity(id);
      },
    };
  };
}

export { Store };
