import { useState, useSyncExternalStore } from "react";
import { type VisibilityProps } from "../types";
import { visibilityModule } from "./visibilityModule";

const createVisibilityClient = () => {
  return {
    useVisibility: (props: VisibilityProps) => {
      visibilityModule.createContext(props);
      const context = visibilityModule.getContextById(props.id);
      console.log("CONTEXT");
      const [subsciber] = useState(() => (notify: () => void) => {
        return context.subscribe("onChange", () => {
          notify();
        });
      });
      const visibility = useSyncExternalStore(
        subsciber,
        context.visibilityClient.getVisibility
      );
      return visibility;
    },
    useVisibilityCommands: (id: string) => {
      const context = visibilityModule.getContextById(id);
      return context.commands;
    },
    useVisibilitySelector: (id: string) => {
      const [mount] = useState(() => {
        return (notify: () => void) => {
          return visibilityModule.moduleSubscribe(`onLoad-${id}`, () => {
            notify();
          });
        };
      });
      const [snapshot] = useState(() => {
        return () => visibilityModule.hasContext(id);
      });
      useSyncExternalStore(mount, snapshot);
      if (!visibilityModule.hasContext(id)) return undefined;

      return visibilityModule.getContextById(id).visibilityClient;
    },
    getVisibilityClient: (id: string) => {
      return visibilityModule.getContextById(id).visibilityClient;
    },
  };
};

export { createVisibilityClient };
