import type { IScopedObserver } from "../../scroped-observer";

class Commands {
  observer: IScopedObserver;
  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }
  nextStep = () => {
    console.log("nextStep");
  };
  prevStep = () => {
    console.log("prevStep");
  };
}

export { Commands };
