import { framework } from "../quantum-ui/framework";

export enum INITIAL_STATE {
  ON = "on",
  OFF = "off",
}

export type initialStateType = `${INITIAL_STATE}`;

export type VisibilityProps = {
  id: string;
  initState: initialStateType;
};

interface IModelState {
  visibility: initialStateType;
}

interface IModelMutations {
  setVisibility: (visibility: initialStateType) => void;
}

interface IModelGetters {
  getVisibility: () => initialStateType;
}

interface ICommands {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

interface ISubscribers {
  onChange: (callback: (payload: initialStateType) => void) => () => void;
}

interface IModelApiClient {
  commands: ICommands;
  subscribers: ISubscribers;
  getVisibility: () => initialStateType;
}
const toggleModule = framework.createModule<
  IModelState,
  IModelMutations,
  IModelGetters,
  IModelApiClient
>({
  name: "VISIBILITY_CLIENT",
  model: (props: VisibilityProps) => {
    return {
      id: props.id,
      state: {
        visibility: "off",
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
        model.mutations.setVisibility("on");
        broker.publish({
          eventName: "onChange",
          payload: "on",
        });
      },
      onClose: () => {
        model.mutations.setVisibility("off");
        broker.publish({
          eventName: "onChange",
          payload: "off",
        });
      },
      onToggle: () => {
        model.mutations.setVisibility(
          model.getters.getVisibility() === "on" ? "off" : "on"
        );
        broker.publish({
          eventName: "onChange",
          payload: model.getters.getVisibility() === "on" ? "off" : "on",
        });
      },
    };
    const subscribers = {
      onChange: (callback: (payload: "on" | "off") => void) => {
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
