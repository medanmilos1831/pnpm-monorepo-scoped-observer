import type { Wizard } from "../Wizard/Wizard";

class Hub {
  entities = new Map<string, Wizard>();
  addEntity = (entity: Wizard) => {
    this.entities.set(entity.id, entity);
  };
  getEntity = (id: string) => {
    return this.entities.get(id);
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
  };
  setup = (entity: Wizard) => {
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
