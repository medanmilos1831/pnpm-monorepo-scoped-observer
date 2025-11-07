import { type VisibilityProps } from "./types";
import { createApp } from "./framework/createApp";

interface IEntity {
  visibility: "on" | "off";
}

// const createVisibility = () => {
//   console.log("createVisibility", framework);
//   return {
//     useVisibility: (props: VisibilityProps) => {},
//     useCommands: (id: string) => {
//       // const commands = entity.getCommands();
//       // return commands;
//     },
//     useVisibilitySelector: (id: string) => {},
//     getVisibilityClient: (id: string) => {
//       // return frameworkAPI
//       //   .getStore()
//       //   .getters.getEntityById(id)
//       //   .api.getClientEntity();
//     },
//   };
// };

const createVisibilityClient = createApp<IEntity>((app) => {
  return () => {
    return {
      useVisibility: (props: VisibilityProps) => {
        app.createEntity({
          id: "pera",
          state: {
            visibility: "on",
          },
          mutations(state: any) {
            return {
              setVisibility: (visibility: "on" | "off") => {
                // app.mutations.setVisibility(visibility);
              },
            };
          },
          getters(state: any) {
            return {
              getVisibility: () => {
                // return app.getters.getVisibility();
              },
            };
          },
        });
        let nesto = app.getEntityById("pera");
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
});

export { createVisibilityClient };
