import { createMachine } from "@scoped-observer/react-state-machine";

const toggleMachine = createMachine({
  init: "inactive",
  transition: {
    inactive: {
      on: {
        TOGGLE: "active",
      },
    },
    active: {
      on: {
        TOGGLE: "inactive",
      },
    },
  },
});

const { send, useMachine, getState } = toggleMachine;

export { send, useMachine, getState };
