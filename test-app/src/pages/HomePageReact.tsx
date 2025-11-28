import { useSyncExternalStore } from "react";
import { quantumUiReact } from "../quantum-ui-react";

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
  onChangeSubscriber: (notify: () => void) => () => void;
}

const { useEntitySelector, useCreateEntity } = quantumUiReact.createModule<
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
      onOpen: () => {
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
        return store.subscribe(() => {
          notify();
        });
      },
    };
  },
});
const HomePageReact = () => {
  useCreateEntity({ id: "toggleOne", state: toggleState.ON });
  const toggle = useEntitySelector("toggleOne");
  const value = useSyncExternalStore(
    toggle?.onChangeSubscriber!,
    toggle?.getState!
  );
  return (
    <div>
      <button onClick={() => toggle?.onOpen()}>Open</button>
      <button onClick={() => toggle?.onClose()}>Close</button>
      <button onClick={() => toggle?.onToggle()}>Toggle</button>
    </div>
  );
};

export { HomePageReact };
