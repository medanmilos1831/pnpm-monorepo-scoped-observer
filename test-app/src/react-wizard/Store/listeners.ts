import { WizardEvents } from "../types";

export function listeners(
  subscribe: (
    eventName:
      | WizardEvents.ON_RESET
      | WizardEvents.ON_FINISH
      | WizardEvents.ON_STEP_CHANGE,
    callback: (data: any) => void
  ) => void
) {
  return (
    eventName:
      | WizardEvents.ON_RESET
      | WizardEvents.ON_FINISH
      | WizardEvents.ON_STEP_CHANGE,
    callback: (data: any) => void
  ) => {
    return subscribe(eventName, callback);
  };
}
