import { useEffect, useState, useSyncExternalStore } from "react";
import { toggleModule } from "./toggleModule";
import { ToggleProps } from "./types";

const createToggleClient = () => {
  return {
    useToggle: (props: ToggleProps) => {
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
    useToggleCommands: (id: string) => {
      const model = toggleModule.getModelById(id);
      return model.commands;
    },
    useToggleSelector: (id: string) => {
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
    getToggleClient: (id: string) => {
      const model = toggleModule.getModelById(id);
      return model;
    },
  };
};

export { createToggleClient };
