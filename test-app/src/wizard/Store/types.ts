import type { createClient } from "../Client/createClient";
import type { Step } from "../Wizard";
import type { Wizard } from "../Wizard/Wizard";

export interface IEntity {
  wizard: Wizard;
  step: Step;
  client: ReturnType<typeof createClient>;
}
