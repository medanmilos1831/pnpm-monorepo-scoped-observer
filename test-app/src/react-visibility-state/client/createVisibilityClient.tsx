import { useState, useSyncExternalStore } from "react";
import { type VisibilityProps } from "../types";
import { visibilityModule } from "./visibilityModule";

const createVisibilityClient = () => {
  return {
    useVisibility: (props: VisibilityProps) => {
      visibilityModule.createContext(props);
      console.log(
        "createVisibilityClient",
        visibilityModule.getContextById(props.id)
      );
      const context = visibilityModule.getContextById(props.id);
      useSyncExternalStore(
        context.listeners.onChange,
        context.entity.getters.getVisibility
      );
      return context.entity.getters.getVisibility();
    },
    useVisibilityCommands: (id: string) => {
      // const entity = visibilityModule.getContextById(id);
      return {
        onChange: () => {
          // entity.entity.mutations.setVisibility(
          //   entity.entity.getters.getVisibility() === "on" ? "off" : "on"
          // );
          // entity.actions.onChange();
        },
        onOpen: () => {
          // entity.entity.mutations.setVisibility("on");
          // entity.actions.onChange();
        },
        onClose: () => {
          // entity.entity.mutations.setVisibility("off");
          // entity.actions.onChange();
        },
      };
    },
    useVisibilitySelector: (id: string) => {
      // const [mount] = useState(() => {
      //   return (notify: () => void) => {
      //     return visibilityModule.subscribe(`onLoad-${id}`, () => {
      //       notify();
      //     });
      //   };
      // });
      // const [snapshot] = useState(() => {
      //   return () => visibilityModule.hasContext(id);
      // });
      // useSyncExternalStore(mount, snapshot);
      // if (!visibilityModule.hasContext(id)) return undefined;
      // return visibilityModule.getContextById(id);
    },
  };
};

export { createVisibilityClient };
