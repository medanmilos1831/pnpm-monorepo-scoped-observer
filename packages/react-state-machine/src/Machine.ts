import { createScopedObserver } from "@scoped-observer/core";
import {
  IStateMachine,
  TransitionMap,
  MACHINE_SCOPE,
  MACHINE_EVENT,
} from "./types";
import { useStateMachine } from "./useStateMachine";

export class Machine<S extends string> {
  stateMachine!: IStateMachine<S>;
  constructor({ init, transition }: { init: S; transition: TransitionMap<S> }) {
    this.stateMachine = {
      state: init,
      manager: createScopedObserver([
        {
          scope: MACHINE_SCOPE,
        },
      ]),
      transition: transition,
      dispatch(payload) {
        this.state = this.transition[this.state].handle();
        this.manager.dispatch({
          scope: MACHINE_SCOPE,
          eventName: MACHINE_EVENT,
          payload: {
            state: this.state,
            payload,
          },
        });
      },
      subscribe(cb) {
        return this.manager.subscribe({
          scope: MACHINE_SCOPE,
          eventName: MACHINE_EVENT,
          callback: (data: {
            payload: {
              state: S;
              payload: any;
            };
          }) => {
            cb(data.payload);
          },
        });
      },
    };
  }
  handler = (payload?: any) => {
    this.stateMachine.dispatch(payload);
  };
  forceHandler = (state: string, payload?: any) => {
    if (
      !this.stateMachine.transition[
        state as keyof typeof this.stateMachine.transition
      ]
    ) {
      console.error(`Invalid state "${state}" passed to forceHandler.`);
      return;
    }
    this.stateMachine.state = state as any;
    this.stateMachine.manager.dispatch({
      scope: MACHINE_SCOPE,
      eventName: MACHINE_EVENT,
      payload: {
        state: this.stateMachine.state,
        payload,
      },
    });
  };
  Component = ({
    children,
  }: {
    children: (data: { state: S; payload: any }) => React.ReactNode;
  }) => {
    const data = useStateMachine(this.stateMachine);
    return children(data);
  };
}
