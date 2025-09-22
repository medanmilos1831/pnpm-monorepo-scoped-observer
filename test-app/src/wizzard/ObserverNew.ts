import { createScopedObserver } from "../scroped-observer";
import { WIZARD_SCOPE } from "./constants";

class ObserverNew {
  observer = createScopedObserver([
    {
      scope: WIZARD_SCOPE,
      subScopes: [],
      log: false,
    },
  ]);
}

export { ObserverNew };
