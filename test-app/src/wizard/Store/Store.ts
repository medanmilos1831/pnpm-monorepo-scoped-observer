import type { IEntity } from "./types";

class Store {
  entities = new Map<string, IEntity>();
  getEntity = (id: string) => {
    return this.entities.get(id)!;
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
  };
  createEntity = (id: string, entity: () => IEntity) => {
    if (!this.getEntity(id)) {
      this.entities.set(id, entity());
    }
    return {
      entity: this.getEntity(id)!,
      disconnect: () => {
        this.removeEntity(id);
      },
    };
  };
}

export { Store };
