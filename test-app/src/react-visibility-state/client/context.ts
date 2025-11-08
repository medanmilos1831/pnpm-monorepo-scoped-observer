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

interface IEntityActions {
  on: () => void;
  off: () => void;
  toggle: () => void;
}
export const visibilityContext = framework.createModule<
  IEntityState,
  IEntityMutations,
  IEntityGetters,
  IEntityActions
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
  actions(stateManager, dispatchAction) {
    return {
      on: () => {
        stateManager.mutations.setVisibility("on");
        dispatchAction({
          eventName: "setVisibility",
          payload: {
            visibility: stateManager.getters.getVisibility(),
          },
        });
      },
      off: () => {
        stateManager.mutations.setVisibility("off");
        dispatchAction({
          eventName: "setVisibility",
          payload: {
            visibility: stateManager.getters.getVisibility(),
          },
        });
      },
      toggle: () => {
        stateManager.mutations.setVisibility(
          stateManager.getters.getVisibility() === "on" ? "off" : "on"
        );
        dispatchAction({
          eventName: "setVisibility",
          payload: {
            visibility: stateManager.getters.getVisibility(),
          },
        });
      },
    };
  },
  listeners(stateManager, subscribe) {
    return {
      onChange: {
        subscriber: (notify: () => void) => {
          return subscribe("setVisibility", () => {
            notify();
          });
        },
        snapshot: () => {
          return stateManager.getters.getVisibility();
        },
      },
    };
  },
});
