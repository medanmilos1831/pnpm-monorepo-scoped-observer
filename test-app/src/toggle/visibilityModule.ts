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

interface IEntityState {
  visibility: "on" | "off";
}

interface IEntityMutations {
  setVisibility: (visibility: "on" | "off") => void;
}

interface IEntityGetters {
  getVisibility: () => "on" | "off";
}

type CommandsType = {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

export interface IModelApiClient {
  commands: CommandsType;
  subscribers: {
    onChange: (notify: () => void) => () => void;
  };
  selectors: {
    subscribe: (
      eventName: string,
      callback: (payload: any) => void
    ) => () => void;
    commands: CommandsType;
  };
  getVisibility: () => "on" | "off";
}
const visibilityModule = framework.createModule<
  IEntityState,
  IEntityMutations,
  IEntityGetters,
  IModelApiClient
>({
  name: "VISIBILITY_CLIENT",
  entity: function (props: VisibilityProps) {
    return {
      id: props.id,
      state: {
        visibility: "off",
      },
      mutations(state) {
        return {
          setVisibility: (visibility: "on" | "off") => {
            state.visibility = visibility;
          },
        };
      },
      getters(state) {
        return {
          getVisibility: () => state.visibility,
        };
      },
      subscribers(params: any) {},
    };
  },
  modelApiClient(stateManager, broker) {
    const commands = {
      onOpen: () => {
        broker.publish({
          eventName: "onChange",
          payload: "on",
        });
      },
      onClose: () => {
        broker.publish({
          eventName: "onChange",
          payload: "off",
        });
      },
      onToggle: () => {
        broker.publish({
          eventName: "onChange",
          payload: stateManager.getters.getVisibility() === "on" ? "off" : "on",
        });
      },
    };
    return {
      commands,
      subscribers: {
        onChange: (notify: () => void) => {
          return broker.subscribe({
            eventName: "onChange",
            callback: ({ payload }: { payload: "on" | "off" }) => {
              stateManager.mutations.setVisibility(payload);
              notify();
            },
          });
        },
      },
      selectors: {
        subscribe: (
          eventName: "onChange",
          callback: (payload: any) => void
        ) => {
          return broker.subscribe({
            eventName,
            callback,
          });
        },
        commands,
      },
      getVisibility: () => stateManager.getters.getVisibility(),
    };
  },
});

export { visibilityModule };
