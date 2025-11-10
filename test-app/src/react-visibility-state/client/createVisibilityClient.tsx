import { useState, useSyncExternalStore } from "react";
import { type VisibilityProps } from "../types";
import { visibilityModule } from "./visibilityModule";

const createVisibilityClient = () => {
  return {
    useVisibility: (props: VisibilityProps) => {
      visibilityModule.createContext(props);
      const context = visibilityModule.getContextById(props.id);
      const [subsciber] = useState(() => (notify: () => void) => {
        return context.subscribe("onChange", () => {
          notify();
        });
      });
      const visibility = useSyncExternalStore(
        subsciber,
        context.entity.getters.getVisibility
      );
      return visibility;
    },
    useVisibilityCommands: (id: string) => {
      const context = visibilityModule.getContextById(id);
      return context.actions.commands;
    },
    useVisibilitySelector: (id: string) => {
      const [mount] = useState(() => {
        return (notify: () => void) => {
          return visibilityModule.subscribe(`onLoad-${id}`, () => {
            notify();
          });
        };
      });
      const [snapshot] = useState(() => {
        return () => visibilityModule.hasContext(id);
      });
      useSyncExternalStore(mount, snapshot);
      if (!visibilityModule.hasContext(id)) return undefined;

      return visibilityModule.getContextById(id).actions.selectorApi;
    },
  };
};

export { createVisibilityClient };
