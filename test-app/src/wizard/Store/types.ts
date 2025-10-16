import type { createClient } from "../Entity/Client/createClient";
import type { StepModule, WizardModule } from "./Entity";

export interface IEntity {
  wizard: WizardModule;
  step: StepModule;
  client: ReturnType<typeof createClient>;
}
