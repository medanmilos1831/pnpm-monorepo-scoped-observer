import { useEffect, useState, useSyncExternalStore } from "react";
import { type VisibilityProps } from "../types";
import { visibilityModule } from "./visibilityModule";

const createVisibilityClient = () => {
  return {
    useVisibility: (props: VisibilityProps) => {
      visibilityModule.createModel(props);
      const model = visibilityModule.getModelById(props.id);
      useEffect(() => {
        return () => {
          visibilityModule.removeModel(props.id);
        };
      }, []);
      const visibility = useSyncExternalStore(
        model.onChangeSync.subscribe,
        model.onChangeSync.snapshot
      );
      return visibility;
    },
    useVisibilityCommands: (id: string) => {
      const model = visibilityModule.getModelById(id);
      return model.commands;
    },
    useModelSelector: (id: string) => {
      const [mount] = useState(() => {
        return (notify: () => void) => {
          return visibilityModule.moduleSubscribe(`onModelLoad-${id}`, () => {
            console.log("ON MODEL LOAD");
            notify();
          });
        };
      });
      const [snapshot] = useState(() => {
        return () => visibilityModule.hasModel(id);
      });
      useSyncExternalStore(mount, snapshot);
      if (!visibilityModule.hasModel(id)) return undefined;

      return visibilityModule.getModelById(id);
    },
    getVisibilityClient: (id: string) => {
      return visibilityModule.getModelById(id);
    },
  };
};

export { createVisibilityClient };
