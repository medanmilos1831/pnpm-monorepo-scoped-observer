import type { IScopedObserver } from "../../scroped-observer";
import { createScopedObserver } from "../../scroped-observer";

class Wizard {
  observer: IScopedObserver = createScopedObserver([
    {
      scope: "wizard",
    },
  ]);
  constructor() {}
}

export { Wizard };
