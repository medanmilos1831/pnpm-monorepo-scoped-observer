import { useState } from "react";
import { createMachine } from "../react-state-machine";

class Visibility {
  name: string;
  machine: any;
  constructor({ name, state }: { name: string; state: "open" | "close" }) {
    this.name = name;
    this.machine = createMachine({
      init: state,
      transition: {
        open: { on: { TOGGLE: "close" } },
        close: { on: { TOGGLE: "open" } },
      },
    });
  }
  api = {
    open: () => {
      this.machine.send({ type: "TOGGLE" });
    },
    close: () => {
      this.machine.send({ type: "TOGGLE" });
      // console.log("close", this.machine.getState());
    },
  };
}

const createVisibilityService = () => {
  let items: any = {};

  return {
    useVisibility({ name, state }: { name: string; state: "open" | "close" }) {
      const [visibilityService] = useState(() => {
        let visibility = new Visibility({ name, state });
        items[name] = visibility;
        return visibility;
      });
      items[name].machine.setState(state);
      return visibilityService.api;
    },
    useWatch(name: string, callback: (state: any) => void) {
      const { state } = items[name].machine.useMachine();
      return callback(state);
    },
  };
};

export { createVisibilityService };
