import { useSyncExternalStore } from "react";
import { quantumUiReact } from "../quantum-ui-react";

interface IToggleClient {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  getState: () => "on" | "off";
  onChangeSubscriber: (notify: () => void) => () => void;
  subscribe: (callback: (payload?: any) => void, eventName?: string) => void;
}
const createToggleClient = () => {
  const toggleModule = quantumUiReact.createModule<"on" | "off", IToggleClient>(
    {
      name: "toggle",
      store: ({ id, state }: { id: string; state: "on" | "off" }) => {
        return {
          id,
          state,
        };
      },
      apiClient: (store) => {
        return {
          onOpen: () => {
            store.setState((state) => "on");
          },
          onClose: () => {
            store.setState((state) => "off");
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
            return store.subscribe(() => {
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
