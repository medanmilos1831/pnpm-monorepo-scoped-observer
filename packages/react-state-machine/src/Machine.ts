import { createScopedObserver } from '@scoped-observer/core';
import { MACHINE_EVENT, MACHINE_SCOPE, TransitionMap } from './types';

export class Machine<S extends string, T extends string = string> {
  state!: S;
  transition!: TransitionMap<S, T>;
  manager = createScopedObserver([
    {
      scope: MACHINE_SCOPE,
    },
  ]);
  constructor({
    init,
    transition,
  }: {
    init: S;
    transition: TransitionMap<S, T>;
  }) {
    this.state = init;
    this.transition = transition;
  }

  handler = (data: { type: T; payload?: any }) => {
    const currentState = this.state;
    const nextState = this.transition[currentState].on[data.type];

    if (nextState) {
      this.state = nextState;
      this.dispatch(data.payload);
    } else {
      console.warn(
        `[Machine] Invalid transition from "${currentState}" using type "${data.type}"`
      );
    }
  };

  private dispatch(payload: any) {
    this.manager.dispatch({
      scope: MACHINE_SCOPE,
      eventName: MACHINE_EVENT,
      payload: {
        state: this.state,
        payload,
      },
    });
  }

  subscribe(cb: (data: { state: S; payload: any }) => void) {
    return this.manager.subscribe({
      scope: MACHINE_SCOPE,
      eventName: MACHINE_EVENT,
      callback: ({ payload }: any) => cb(payload),
    });
  }
}
