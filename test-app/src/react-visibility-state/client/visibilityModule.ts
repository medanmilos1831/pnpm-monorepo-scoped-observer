import { framework } from "../framework";
import type { VisibilityProps } from "../types";

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

interface IModelApiClient {
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
        visibility: props.initState,
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
    };
  },
  modelApiClient(entity, dispatch, subscribe) {
    const commands = {
      onOpen: () => {
        entity.mutations.setVisibility("on");
        dispatch("onChange", {
          visibility: "on",
        });
      },
      onClose: () => {
        entity.mutations.setVisibility("off");
        dispatch("onChange", {
          visibility: "off",
        });
      },
      onToggle: () => {
        entity.mutations.setVisibility(
          entity.getters.getVisibility() === "on" ? "off" : "on"
        );
        dispatch("onChange", {
          visibility: entity.getters.getVisibility() === "on" ? "off" : "on",
        });
      },
    };
    return {
      commands,
      subscribe,
      getVisibility: () => entity.getters.getVisibility(),
      onChangeSync: {
        snapshot: () => entity.getters.getVisibility(),
        subscribe: (notify: () => void) => {
          return subscribe("onChange", () => {
            notify();
          });
        },
      },
    };
  },
});

export { visibilityModule };
