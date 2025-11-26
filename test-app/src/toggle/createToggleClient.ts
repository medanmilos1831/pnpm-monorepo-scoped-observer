import { quantumUiReact } from "@med1802/quantum-ui-react";

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
      const toggle = toggleModule.getEntityById(id);
      console.log("USE TOGGLE", toggle);
      return toggle?.store.state;
    },
    useToggleCommands: (id: string) => {
      const toggle = toggleModule.getEntityById(id);
      return {
        onOpen: () => {
          toggle?.store.setState(() => "on");
        },
        onClose: () => {
          toggle?.store.setState(() => "off");
        },
        onToggle: () => {
          toggle?.store.setState((state) => (state === "on" ? "off" : "on"));
        },
      };
    },
  };
};

export { createToggleClient };
