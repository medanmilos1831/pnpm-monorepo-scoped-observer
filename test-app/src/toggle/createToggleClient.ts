import { useState, useSyncExternalStore } from "react";
import { quantumUiReact } from "../quantum-ui-react";

const createToggleClient = () => {
  const toggleModule = quantumUiReact.createModule<"on" | "off">({
    name: "toggle",
    store: ({ id, state }: { id: string; state: "on" | "off" }) => {
      return {
        id,
        state,
      };
    },
    apiClient: (store: any) => {
      return {
        onOpen: () => {
          store.setState((state: "on" | "off") => "on");
        },
        onClose: () => {
          store.setState((state: "on" | "off") => "off");
        },
        onToggle: () => {
          store.setState((prevState: "on" | "off") => {
            let r = prevState === "on" ? "off" : "on";
            return r;
          });
        },
        getState: () => {
          return store.getState();
        },
        logState: () => {
          console.log("STATE", store.state);
        },
        onChangeSubscriber: (notify: () => void) => {
          return store.subscribe((payload: any) => {
            notify();
          });
        },
        subscribe: store.subscribe,
        setState: store.setState,
      };
    },
  });
  return {
    useToggle: ({ id, initState }: { id: string; initState: "on" | "off" }) => {
      toggleModule.useCreateEntity({ id, state: initState });
      const model = toggleModule.getEntityById(id)!;
      const visibility = useSyncExternalStore(
        model?.onChangeSubscriber,
        model?.getState
      );
      return visibility;
    },
    useToggleCommands: (id: string) => {
      const toggle = toggleModule.getEntityById(id) as any;
      return {
        onOpen: toggle.onOpen,
        onClose: toggle.onClose,
        onToggle: toggle.onToggle,
        logState: toggle.logState,
      };
    },
  };
};

export { createToggleClient };
