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
  });
  return {
    useToggle: ({ id, initState }: { id: string; initState: "on" | "off" }) => {
      toggleModule.useCreateEntity({ id, state: initState });
      const model = toggleModule.getEntityById(id)!;
      const visibility = useSyncExternalStore(
        (notify: () => void) => {
          return model?.subscribe((payload: any) => {
            notify();
          })!;
        },
        () => {
          return model?.getState();
        }
      );
      return visibility;
    },
    useToggleCommands: (id: string) => {
      const toggle = toggleModule.getEntityById(id)!;
      return {
        onOpen: () => {
          toggle.setState((state) => "on");
        },
        onClose: () => {
          toggle.setState((state) => "off");
        },
        onToggle: () => {
          toggle.setState((prevState) => {
            return prevState === "on" ? "off" : "on";
          });
        },
      };
    },
  };
};

export { createToggleClient };
