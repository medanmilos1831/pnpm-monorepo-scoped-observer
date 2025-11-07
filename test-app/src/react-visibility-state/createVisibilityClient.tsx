import { type VisibilityProps } from "./types";
import { createApp } from "./framework/createApp";
import { useVisibilty } from "./react-integration/useVisibilty";

interface IEntityState {
  visibility: "on" | "off";
}

interface IEntityMutations {
  setVisibility: (visibility: "on" | "off") => void;
}

interface IEntityGetters {
  getVisibility: () => "on" | "off";
}

const createVisibilityClient = createApp<
  IEntityState,
  IEntityMutations,
  IEntityGetters
>(
  (app) => {
    return () => {
      return {
        useVisibility: (props: VisibilityProps) => {
          app.createEntity(props);
          useVisibilty(props);
          // console.log("eeee", entity);
        },
        useCommands: (id: string) => {
          // const commands = entity.getCommands();
          // return commands;
        },
        useVisibilitySelector: (id: string) => {},
        getVisibilityClient: (id: string) => {
          // return frameworkAPI
          //   .getStore()
          //   .getters.getEntityById(id)
          //   .api.getClientEntity();
        },
      };
    };
  },
  {
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
    appName: "VISIBILITY_APP",
  }
);

export { createVisibilityClient };
