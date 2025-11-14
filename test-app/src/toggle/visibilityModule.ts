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

type SubscribeType = (
  eventName: string,
  callback: (payload: any) => void
) => () => void;

export interface IModelApiClient {
  getVisibility: () => "on" | "off";
  commands: CommandsType;
  subscribe: SubscribeType;
  onChangeSync: {
    snapshot: () => "on" | "off";
    subscribe: (notify: () => void) => () => void;
  };
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
    return {
      commands: {
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
            payload:
              stateManager.getters.getVisibility() === "on" ? "off" : "on",
          });
        },
      },
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
      getVisibility: () => stateManager.getters.getVisibility(),
    };
    // return {
    //   commands,
    //   subscribe,
    //   getVisibility: () => entity.getters.getVisibility(),
    //   onChangeSync: {
    //     snapshot: () => entity.getters.getVisibility(),
    //     subscribe: (notify: () => void) => {
    //       return subscribe("onChange", () => {
    //         notify();
    //       });
    //     },
    //   },
    // };
  },
});

export { visibilityModule };
