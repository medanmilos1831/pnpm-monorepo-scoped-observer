import type { IScopedObserver } from "../../scroped-observer";

class Commands {
  observer: IScopedObserver;
  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }
  nextStep = () => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: "navigate",
      payload: "next",
    });
  };
  prevStep = () => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: "navigate",
      payload: "prev",
    });
  };
}

export { Commands };
