import {
  createScopedObserver,
  type IScopedObserver,
} from "../scroped-observer";
import { WIZARD_SCOPE } from "./constants";
import { Events } from "./Events";
import { Subscribers } from "./Subscribers";

class Observer {
  private observer: IScopedObserver = createScopedObserver([
    {
      scope: WIZARD_SCOPE,
    },
  ]);
  public events: Events = new Events(this.observer);
  public subscribers: Subscribers = new Subscribers(this.observer);
}

export { Observer };
