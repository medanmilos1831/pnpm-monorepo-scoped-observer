import { type VisibilityProps } from "./types";
import { createApp } from "./framework/createApp";

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

const createVisibility = createApp((app) => {
  return () => {
    return {
      useVisibility: (props: VisibilityProps) => {},
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

export { createVisibility };
