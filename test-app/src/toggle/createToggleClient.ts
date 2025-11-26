import { useSyncExternalStore } from "react";
import { quantumUiReact } from "@med1802/quantum-ui-react";

import {
  INITIAL_STATE,
  type initialStateType,
  type ToggleProps,
} from "./types";

const createToggleClient = () => {
  const quantumUi = quantumUiReact();
  const toggleModule = quantumUi.createModule({
    name: "toggle",
    model: (props: ToggleProps) => {
      return {
        id: props.id,
        state: {
          visibility: props.initState,
        },
        mutations(state) {
          return {
            setVisibility: (visibility: initialStateType) => {
              state.visibility = visibility;
            },
          };
        },
        getters(state) {
          return {
            getVisibility: () => state.visibility,
          };
        },
      };
    },
    modelClient: (model, broker) => {
      const commands = {
        onOpen: () => {
          model.mutations.setVisibility(INITIAL_STATE.ON);
          broker.publish({
            eventName: "onChange",
            payload: INITIAL_STATE.ON,
          });
        },
        onClose: () => {
          model.mutations.setVisibility(INITIAL_STATE.OFF);
          broker.publish({
            eventName: "onChange",
            payload: INITIAL_STATE.OFF,
          });
        },
        onToggle: () => {
          model.mutations.setVisibility(
            model.getters.getVisibility() === INITIAL_STATE.ON
              ? INITIAL_STATE.OFF
              : INITIAL_STATE.ON
          );
          broker.publish({
            eventName: "onChange",
            payload:
              model.getters.getVisibility() === INITIAL_STATE.ON
                ? INITIAL_STATE.OFF
                : INITIAL_STATE.ON,
          });
        },
      };
      const subscribers = {
        onChange: (callback: (payload: initialStateType) => void) => {
          return broker.subscribe({
            eventName: "onChange",
            callback,
          });
        },
      };
      return {
        commands,
        subscribers,
        getVisibility: model.getters.getVisibility,
      };
    },
  });
  return {
    useToggle: (props: ToggleProps) => {
      toggleModule.useCreateModel(props);
      const model = toggleModule.getModelById(props.id);
      const visibility = useSyncExternalStore(
        model.subscribers.onChange,
        model.getVisibility
      );
      return visibility;
    },
    useToggleCommands: (id: string) => {
      const model = toggleModule.getModelById(id);
      return model
        ? model.commands
        : {
            onOpen: () => {},
            onClose: () => {},
            onToggle: () => {},
          };
    },
    useToggleSelector: toggleModule.useModelSelector,
    getToggleClient: (id: string) => {
      const model = toggleModule.getModelById(id);
      return model;
    },
  };
};

export { createToggleClient };
