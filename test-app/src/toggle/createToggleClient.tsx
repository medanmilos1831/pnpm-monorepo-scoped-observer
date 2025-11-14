import { useState, useSyncExternalStore, useEffect } from "react";
import { visibilityModule } from "./visibilityModule";

const createToggleClient = () => {
  return {
    useVisibility: (props: any) => {
      visibilityModule.createModel(props);
      const model = visibilityModule.getModelById(props.id);
      useEffect(() => {
        return () => {
          visibilityModule.removeModel(props.id);
        };
      }, []);
      const visibility = useSyncExternalStore(
        model.subscribers.onChange,
        model.getVisibility
      );
      return visibility as "on" | "off";
    },
    useVisibilityCommands: (id: string) => {
      const model = visibilityModule.getModelById(id);
      return model.commands;
    },
    useModelSelector: (id: string) => {
      const [lifeCycle] = useState(visibilityModule.lifeCycle.bind(id));
      const [snapshot] = useState(() => {
        return () => {
          return visibilityModule.hasModel(id);
        };
      });
      let hasModel = useSyncExternalStore(lifeCycle.mount, snapshot);
      useSyncExternalStore(lifeCycle.unmount, snapshot);
      return hasModel ? visibilityModule.getModelById(id).selectors : undefined;
    },
    getVisibilityClient: (id: string) => {
      return visibilityModule.getModelById(id);
    },
  };
};

export { createToggleClient };
