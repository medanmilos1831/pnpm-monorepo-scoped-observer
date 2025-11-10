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

interface IContextApiClientType {
  commands: CommandsType;
  visibilityClient: {
    getVisibility: () => "on" | "off";
    getCommands: () => CommandsType;
    subscribe: (
      eventName: string,
      callback: (payload: any) => void
    ) => () => void;
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
  contextApiClient(stateManager, dispatch, subscribe) {
    const commands = {
      onOpen: () => {
        stateManager.mutations.setVisibility("on");
        dispatch("onChange", {
          visibility: "on",
        });
      },
      onClose: () => {
        stateManager.mutations.setVisibility("off");
        dispatch("onChange", {
          visibility: "off",
        });
      },
      onToggle: () => {
        stateManager.mutations.setVisibility(
          stateManager.getters.getVisibility() === "on" ? "off" : "on"
        );
        dispatch("onChange", {
          visibility:
            stateManager.getters.getVisibility() === "on" ? "off" : "on",
        });
      },
    };
    return {
      commands,
      visibilityClient: {
        getVisibility: () => stateManager.getters.getVisibility(),
        getCommands: () => commands,
        subscribe,
      },
    };
  },
});
