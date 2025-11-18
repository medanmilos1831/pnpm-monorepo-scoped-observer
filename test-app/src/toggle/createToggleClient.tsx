import { useEffect, useState, useSyncExternalStore } from "react";
import { toggleModule, type VisibilityProps } from "./toggleModule";

const createToggleClient = () => {
  return {
    useVisibility: (props: VisibilityProps) => {
      toggleModule.createModel(props);
      const model = toggleModule.getModelById(props.id);

      useEffect(() => {
        return () => {
          toggleModule.removeModel(props.id);
        };
      }, []);
      const visibility = useSyncExternalStore(
        model.subscribers.onChange,
        model.getVisibility
      );
      return visibility;
    },
    useVisibilityCommands: (id: string) => {
      const model = toggleModule.getModelById(id);
      return model.commands;
    },
    useModelSelector: (id: string) => {
      const [lifeCycle] = useState(toggleModule.lifeCycle.bind(id));
      const [snapshot] = useState(() => {
        return () => {
          return toggleModule.hasModel(id);
        };
      });
      let hasModel = useSyncExternalStore(lifeCycle.mount, snapshot);
      useSyncExternalStore(lifeCycle.unmount, snapshot);
      const model = toggleModule.getModelById(id);
      return hasModel ? model : undefined;
    },
    getVisibilityClient: (id: string) => {
      const model = toggleModule.getModelById(id);
      return model;
    },
  };
};

export { createToggleClient };
