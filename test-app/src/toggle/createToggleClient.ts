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
  onChange: ISubscribe<toggleStateType>;
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
        onChange: (notify: (payload: toggleStateType) => void) => {
          return store.subscribe(() => {
            notify(store.getState());
          });
        },
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
      const entity = toggleModule.getEntityById(id)!;
      const value = useSyncExternalStore(entity.onChange, entity.getState);
      return value;
    },
    useToggleSelector: toggleModule.useEntitySelector,
    getToggleCommands: (id: string) => {
      const { onOpen, onClose, onToggle } = toggleModule.getEntityById(id)!;
      return {
        onOpen,
        onClose,
        onToggle,
      };
    },
    getToggleEntityById: (id: string) => {
      return toggleModule.getEntityById(id)!;
    },
    onToggleLoad: toggleModule.onEntityLoad,
    onToggleDestroy: toggleModule.onEntityDestroy,
  };
};

export { createToggleClient };
