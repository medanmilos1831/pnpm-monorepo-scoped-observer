import { createScopedObserver } from "@scoped-observer/core";

export function stateFn(props: any) {
  const observer = createScopedObserver([
    {
      scope: "WIZARD_STORE_SCOPE",
    },
  ]);
  return {
    observer: {
      dispatch: (eventName: string, payload?: any) => {
        observer.dispatch({
          scope: "WIZARD_STORE_SCOPE",
          eventName,
          payload: payload || undefined,
        });
      },
      subscribe: (eventName: string, callback: (payload: any) => void) => {
        return observer.subscribe({
          scope: "WIZARD_STORE_SCOPE",
          eventName,
          callback,
        });
      },
    },
    id: props.id,
    steps: props.steps,
    activeStep: props.activeStep,
    isLast: props.steps.length - 1 === props.steps.indexOf(props.activeStep),
    isFirst: props.steps.indexOf(props.activeStep) === 0,
    __INTERNAL__STEPS: [...props.steps],
    __INTERNAL__ACTIVE_STEP: props.activeStep,
  };
}
