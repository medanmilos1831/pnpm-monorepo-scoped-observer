import { useEffect, useState, useSyncExternalStore } from "react";
import { visibilityModule } from "./visibilityModule";

const createToggleClient = () => {
  return {
    useVisibility: (props: any) => {
      visibilityModule.createModel(props);
      const model = visibilityModule.getModelById(props.id);
      // model.publisher({
      //   type: "onOpen",
      //   payload: undefined,
      // });
      // model.subscriber.onOpen();
      // model.onOpen();
      // const obj = model.getObj();
      // useEffect(() => {
      //   visibilityModule.lifeCycle(props.id);
      //   return () => {
      //     visibilityModule.removeModel(props.id);
      //     visibilityModule.lifeCycle(props.id);
      //   };
      // }, []);
      const visibility = useSyncExternalStore(
        model.subscribers.onChange,
        model.getVisibility
      );
      console.log("RENDERED VISIBILITY", visibility);
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

export { createToggleClient };
