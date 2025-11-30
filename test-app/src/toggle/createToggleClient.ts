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
    useCreateToggle: (params: { id: string; initState: toggleStateType }) => {
      const hasEntity = toggleModule.hasEntity(params.id);

      if (hasEntity) {
        console.warn(
          `Toggle ${params.id} already exists. State will not be reset.`
        );
      }
      const { id, initState } = params;
      toggleModule.useCreateEntity({ id, state: initState });
    },
    useToggleState: (id: string) => {
      const entity = toggleModule.getEntityById(id)!;
      if (!entity) {
        throw new Error(`Toggle ${id} not found`);
      }
      const value = useSyncExternalStore(entity.onChange, entity.getState);
      return value;
    },
    onChange: (id: string, callback: (payload: toggleStateType) => void) => {
      const entity = toggleModule.getEntityById(id)!;
      if (!entity) {
        throw new Error(`Toggle ${id} not found`);
      }
      return entity.onChange((payload) => {
        callback(payload);
      });
    },
    getToggleCommands: (id: string) => {
      const { onOpen, onClose, onToggle } = toggleModule.getEntityById(id)!;
      return {
        onOpen,
        onClose,
        onToggle,
      };
    },
    getToggleState: (id: string) => {
      const entity = toggleModule.getEntityById(id)!;
      if (!entity) {
        throw new Error(`Toggle ${id} not found`);
      }
      return entity.getState();
    },
  };
};

export { createToggleClient };
