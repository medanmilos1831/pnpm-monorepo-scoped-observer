class Hub {
  entities = new Map<string, any>();
  addEntity = (entity: any) => {
    this.entities.set(entity.id, entity);
  };
  getEntity = (id: string) => {
    return this.entities.get(id);
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
  };
}

export { Hub };
