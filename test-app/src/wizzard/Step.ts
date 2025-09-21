import { MiddlewareManager } from "./MiddlewareManager";
import type { WizzardRoute } from "./types";

class Step {
  name: string;
  isCompleted: boolean;
  isChanged: boolean;
  state: any = undefined;
  stepHistory = undefined;
  visible: boolean = true;
  validators;
  constructor(config: WizzardRoute) {
    this.name = config.name;
    this.visible = config.visible ?? true;
    this.isCompleted = false;
    this.isChanged = false;
    this.stepHistory = undefined;
    this.validators = config.validators;
  }
}

export { Step };
