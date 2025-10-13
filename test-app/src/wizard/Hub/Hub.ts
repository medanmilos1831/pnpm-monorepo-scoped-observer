import type { StepEntity } from "../Wizard/StepEntity";
import type { Wizard } from "../Wizard/Wizard";

class Hub {
  entities = new Map<
    string,
    {
      wizard: Wizard;
      stepEntity: StepEntity;
    }
  >();
  addEntity = (obj: { wizard: Wizard; stepEntity: StepEntity }) => {
    this.entities.set(obj.wizard.id, {
      wizard: obj.wizard,
      stepEntity: obj.stepEntity,
    });
  };
  getEntity = (id: string) => {
    return this.entities.get(id)!;
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
  };
  setup = (wizard: Wizard, stepEntity: StepEntity) => {
    if (!this.getEntity(wizard.id)) {
      this.addEntity({
        wizard,
        stepEntity,
      });
    }
    return {
      entity: this.getEntity(wizard.id)!,
      disconnect: () => {
        this.removeEntity(wizard.id);
      },
    };
  };
}

export { Hub };
