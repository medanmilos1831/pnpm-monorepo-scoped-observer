import { framework } from "@med1802/quantum-ui";
import {
  IModelApiClient,
  IModelGetters,
  IModelMutations,
  IModelState,
  INITIAL_STATE,
  initialStateType,
  ToggleProps,
} from "./types";

const toggleModule = framework.createModule<
  IModelState,
  IModelMutations,
  IModelGetters,
  IModelApiClient
>({
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

export { toggleModule };
