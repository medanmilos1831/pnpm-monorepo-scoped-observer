import { createMachine } from "../../../scoped-observer/react-state-machine";

class VisibilityInstance {
  name: string;
  machine;
  constructor(name: string, obj: { initState: "open" | "close" }) {
    this.name = name;
    this.machine = createMachine({
      init: obj.initState,
      transition: {
        close: {
          on: {
            ON_OPEN: "open",
            RESET: "close",
          },
        },
        open: {
          on: {
            ON_CLOSE: "close",
            RESET: "close",
          },
        },
      },
    });
  }
  api = {
    open: (payload?: any) => {
      this.machine.send({
        type: "ON_OPEN",
        payload,
      });
    },
    close: () => {
      this.machine.send({
        type: "ON_CLOSE",
      });
    },
    reset: () => {
      this.machine.send({
        type: "RESET",
      });
    },
  };
}

export { VisibilityInstance };
