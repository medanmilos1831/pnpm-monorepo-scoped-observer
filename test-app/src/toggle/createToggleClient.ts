import { useSyncExternalStore } from "react";
import { quantumUiReact, type ISubscribe } from "../quantum-ui-react";

enum toggleState {
  ON = "on",
  OFF = "off",
}

type toggleStateType = `${toggleState}`;

interface IToggleClient {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  getState: () => toggleStateType;
  onChangeSubscriber: ISubscribe<toggleStateType>;
  subscribe: ISubscribe<toggleStateType>;
}
const createToggleClient = () => {
  const toggleModule = quantumUiReact.createModule<
    toggleStateType,
    IToggleClient
  >({
    name: "toggle",
    onCreateEntity: ({ id, state }: { id: string; state: toggleStateType }) => {
      return {
        id,
        state,
      };
    },
    clientSchema: (store) => {
      return {
        onOpen() {
          store.setState(() => toggleState.ON);
        },
        onClose: () => {
          store.setState(() => toggleState.OFF);
        },
        onToggle: () => {
          store.setState((prevState) => {
            return prevState === toggleState.ON
              ? toggleState.OFF
              : toggleState.ON;
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
  });
  return {
    useToggle: ({
      id,
      initState,
    }: {
      id: string;
      initState: toggleStateType;
    }) => {
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
