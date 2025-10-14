import type { Step } from "../Wizard";
import type { Wizard } from "../Wizard/Wizard";

export interface ISlice {
  wizard: Wizard;
  step: Step;
}
