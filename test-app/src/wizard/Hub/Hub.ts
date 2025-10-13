import type { Entity } from "../Entity/Entity";

class Hub {
  entities = new Map<string, Entity>();
  addEntity = (entity: Entity) => {
    this.entities.set(entity.id, entity);
  };
  getEntity = (id: string) => {
    return this.entities.get(id);
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
  };
  setup = (entity: Entity) => {
    if (!this.getEntity(entity.id)) {
      this.addEntity(entity);
    }
    return {
      entity: this.getEntity(entity.id)!,
      disconnect: () => {
        this.removeEntity(entity.id);
      },
    };
  };
}

export { Hub };
