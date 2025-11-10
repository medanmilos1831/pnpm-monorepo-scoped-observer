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

interface IContextApiClientType {
  commands: CommandsType;
  subscribe: SubscribeType;
  visibilityClient: {
    getVisibility: () => "on" | "off";
    getCommands: () => CommandsType;
    subscribe: SubscribeType;
  };
}
export const visibilityModule = framework.createModule<
  IEntityState,
  IEntityMutations,
  IEntityGetters,
  IContextApiClientType
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
  contextApiClient(entity, dispatch, subscribe) {
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
      visibilityClient: {
        getVisibility: () => entity.getters.getVisibility(),
        getCommands: () => commands,
        subscribe,
      },
    };
  },
});
