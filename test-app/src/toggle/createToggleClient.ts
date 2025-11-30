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
  const entityInstance = (entity: IToggleClient) => {
    return {
      onChange: (callback: (payload: toggleStateType) => void) => {
        return entity.onChange(callback);
      },
      onOpen: entity.onOpen,
      onClose: entity.onClose,
      onToggle: entity.onToggle,
      getState: entity.getState,
    };
  };
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
      const entity = toggleModule.getEntityById(id)!;
      return entityInstance(entity);
    },
    useToggleInstance: (id: string) => {
      const entity = toggleModule.getEntityById(id)!;
      return entity ? entityInstance(entity) : undefined;
    },
    useToggleState: (id: string) => {
      const entity = toggleModule.getEntityById(id)!;
      if (!entity) {
        return undefined;
      }
      const value = useSyncExternalStore(entity.onChange, entity.getState);
      return value;
    },
    getToggleInstance: (id: string) => {
      const entity = toggleModule.getEntityById(id)!;
      return entity ? entityInstance(entity) : undefined;
    },
  };
};

export { createToggleClient };
