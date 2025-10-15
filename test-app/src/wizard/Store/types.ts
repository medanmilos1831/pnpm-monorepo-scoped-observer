import type { createClient } from "../Entity/Client/createClient";
import type { Step } from "../Entity";
import type { Wizard } from "../Entity/Wizard";

export interface IEntity {
  wizard: Wizard;
  step: Step;
  client: ReturnType<typeof createClient>;
}
