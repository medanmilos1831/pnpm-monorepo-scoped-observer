import { useEffect, useState, useSyncExternalStore } from "react";
import { framework } from "@med1802/quantum-ui";

const quantumUiModuleReact = (
  props: ReturnType<typeof framework.createModule>
) => {
  return {
    useModelSelector: (modelId: string) => {
      const [mount] = useState(() => {
        return (notify: () => void) => {
          return props.onModelMount(modelId, () => {
            notify();
          });
        };
      });
      const [unmount] = useState(() => {
        return (notify: () => void) => {
          return props.onModelUnmount(modelId, () => {
            notify();
          });
        };
      });
      const [snapshot] = useState(() => () => {
        return props.getModelById(modelId);
      });
      let value = undefined;
      value = useSyncExternalStore(mount, snapshot);
      value = useSyncExternalStore(unmount, snapshot);
      return value;
    },
    useCreateModel: (modelId: string) => {
      props.createModel(props);

      useEffect(() => {
        return () => {
          props.removeModel(modelId);
        };
      }, []);
    },
    getModelById: props.getModelById,
    createModel: props.createModel,
    removeModel: props.removeModel,
    onModelMount: props.onModelMount,
    onModelUnmount: props.onModelUnmount,
  };
};

export { quantumUiModuleReact };
