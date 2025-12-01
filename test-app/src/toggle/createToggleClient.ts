import { useSyncExternalStore } from "use-sync-external-store/shim";
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
      initState?: toggleStateType;
    }) => {
      const hasEntity = toggleModule.hasEntity(id);
      if (!hasEntity && !initState) {
        throw new Error(`Toggle ${id} not found`);
      }
      toggleModule.useCreateEntity({ id, state: initState ?? toggleState.OFF });
      const entity = toggleModule.getEntityById(id)!;
      const value = useSyncExternalStore(entity.onChange, entity.getState);
      return [
        value,
        {
          onOpen: entity.onOpen,
          onClose: entity.onClose,
          onToggle: entity.onToggle,
        },
      ] as [
        toggleState,
        {
          onOpen: () => void;
          onClose: () => void;
          onToggle: () => void;
        }
      ];
    },

    getToggleInstance: (id: string) => {
      const entity = toggleModule.getEntityById(id)!;
      return entity
        ? {
            onChange: entity.onChange,
            onOpen: entity.onOpen,
            onClose: entity.onClose,
            onToggle: entity.onToggle,
            getState: entity.getState,
          }
        : undefined;
    },
  };
};

export { createToggleClient };
