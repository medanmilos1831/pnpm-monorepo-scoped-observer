import { useEffect, useState, useSyncExternalStore } from "react";
import { visibilityModule, VisibilityProps } from "./visibilityModule";

const createVisibilityClient = () => {
  return {
    useVisibility: (props: VisibilityProps) => {
      visibilityModule.createModel(props);
      const model = visibilityModule.getModelById(props.id);
      useEffect(() => {
        visibilityModule.lifeCycle(props.id);
        return () => {
          visibilityModule.removeModel(props.id);
          visibilityModule.lifeCycle(props.id);
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
          return visibilityModule.subscribe(`onModelLoad-${id}`, () => {
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
