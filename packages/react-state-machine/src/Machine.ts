import { createScopedObserver } from "@scoped-observer/core";
import {
  IStateMachine,
  MACHINE_EVENT,
  MACHINE_SCOPE,
  TransitionMap,
} from "./types";
import { useStateMachine } from "./useStateMachine";

export class Machine<S extends string, T extends string = string> {
  stateMachine: IStateMachine<S, T>;

  constructor({
    init,
    transition,
  }: {
    init: S;
    transition: TransitionMap<S, T>;
  }) {
    this.stateMachine = {
      state: init,
      manager: createScopedObserver([
        {
          scope: MACHINE_SCOPE,
        },
      ]),
      transition,
      dispatch: (payload: any) => {
        this.stateMachine.manager.dispatch({
          scope: MACHINE_SCOPE,
          eventName: MACHINE_EVENT,
          payload: {
            state: this.stateMachine.state,
            payload,
          },
        });
      },
      subscribe: (cb: (data: { state: S; payload: any }) => void) => {
        return this.stateMachine.manager.subscribe({
          scope: MACHINE_SCOPE,
          eventName: MACHINE_EVENT,
          callback: ({ payload }: any) => cb(payload),
        });
      },
    };
  }

  handler = (data: { type: T; payload?: any }) => {
    const currentState = this.stateMachine.state;
    const nextState = this.stateMachine.transition[currentState].on[data.type];

    if (nextState) {
      this.stateMachine.state = nextState;
      this.stateMachine.dispatch(data.payload);
    } else {
      console.warn(
        `[Machine] Invalid transition from "${currentState}" using type "${data.type}"`
      );
    }
  };

  Component = ({
    children,
  }: {
    children: (data: { state: S; payload: any }) => React.ReactNode;
  }) => {
    const data = useStateMachine(this.stateMachine);
    return children(data);
  };

  useMachine = () => {
    const data = useStateMachine(this.stateMachine);
    return data;
  };
}
