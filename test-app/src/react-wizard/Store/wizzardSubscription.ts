import { WizardEvents } from "../types";
import type { gettersFn } from "./getters";
import type { mutationsFn } from "./mutations";

export function wizzardSubscriptionFn(
  getters: ReturnType<typeof gettersFn>,
  mutations: ReturnType<typeof mutationsFn>,
  props: any,
  setSuccessRender: (success: boolean) => void
) {
  return {
    onFinishSubscription: () => {
      let unsubscribe = () => {};
      if (props.onFinish) {
        return getters.subscribe(WizardEvents.ON_FINISH, () => {
          props.onFinish({
            reset: () => {
              mutations.reset();
            },
            render: () => {
              setSuccessRender(true);
            },
          });
        });
      }
      return () => unsubscribe();
    },
    onResetSubscription: () => {
      let unsubscribe = () => {};
      if (!props.onReset) return;
      unsubscribe = getters.subscribe(WizardEvents.ON_RESET, props.onReset);
      return () => {
        unsubscribe();
      };
    },
  };
}
