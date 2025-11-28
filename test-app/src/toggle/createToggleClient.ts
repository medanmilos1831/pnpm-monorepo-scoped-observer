import { useSyncExternalStore } from "react";
import { quantumUiReact, type ISubscribe } from "../quantum-ui-react";

interface IToggleClient {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  getState: () => "on" | "off";
  onChangeSubscriber: ISubscribe<"on" | "off">;
  subscribe: ISubscribe<"on" | "off">;
}
const createToggleClient = () => {
  const toggleModule = quantumUiReact.createModule<"on" | "off", IToggleClient>(
    {
      name: "toggle",
      onCreateEntity: ({ id, state }: { id: string; state: "on" | "off" }) => {
        return {
          id,
          state,
        };
      },
      clientSchema: (store) => {
        return {
          onOpen() {
            store.setState(() => "on");
          },
          onClose: () => {
            store.setState(() => "off");
          },
          onToggle: () => {
            store.setState((prevState) => {
              return prevState === "on" ? "off" : "on";
            });
          },
          getState: () => {
            return store.getState();
          },
          onChangeSubscriber: (notify: () => void) => {
            return store.subscribe((payload) => {
              notify();
            });
          },
          subscribe: store.subscribe,
        };
      },
    }
  );
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
    useToggleSelector: toggleModule.useEntitySelector,
    useToggleCommands: (id: string) => {
      const { onOpen, onClose, onToggle } = toggleModule.getEntityById(id)!;
      return {
        onOpen,
        onClose,
        onToggle,
      };
    },
  };
};

export { createToggleClient };
