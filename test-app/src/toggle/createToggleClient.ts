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
    useToggle: (props: any) => {},
    useToggleCommands: (id: string) => {},
  };
};

export { createToggleClient };
