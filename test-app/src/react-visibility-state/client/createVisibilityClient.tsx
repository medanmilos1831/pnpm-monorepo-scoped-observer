import { useSyncExternalStore } from "react";
import { type VisibilityProps } from "../types";
import { visibilityContext } from "./context";

const createVisibilityClient = () => {
  return {
    useVisibility: (props: VisibilityProps) => {
      visibilityContext.createContext(props);
      const context = visibilityContext.getContextById(props.id);
      useSyncExternalStore(
        context.listeners.onChange,
        context.entity.getters.getVisibility
      );
      return context.entity.getters.getVisibility();
    },
    useVisibilityCommands: (id: string) => {
      const entity = visibilityContext.getContextById(id);
      return {
        onChange: () => {
          entity.entity.mutations.setVisibility(
            entity.entity.getters.getVisibility() === "on" ? "off" : "on"
          );
          entity.actions.onChange();
        },
        onOpen: () => {
          entity.entity.mutations.setVisibility("on");
          entity.actions.onChange();
        },
        onClose: () => {
          entity.entity.mutations.setVisibility("off");
          entity.actions.onChange();
        },
      };
    },
    useVisibilitySelector: (id: string) => {
      // const entity = visibilityContext.onContextLoad();
      visibilityContext.onContextLoad();
      return undefined;
      // return entity;
      // return entity.entity.getters.getVisibility();
    },
  };
};

export { createVisibilityClient };
