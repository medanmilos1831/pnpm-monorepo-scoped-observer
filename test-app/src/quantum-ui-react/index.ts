import { useState, useSyncExternalStore } from "react";
import type { framework } from "../quantum/framework";

const quantumUiReact = (props: ReturnType<typeof framework.createModule>) => {
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
    getModelById: (modelId: string) => {
      return props.getModelById(modelId);
    },
    createModel: (modelId: string) => {
      return props.createModel(modelId);
    },
    removeModel: (modelId: string) => {
      return props.removeModel(modelId);
    },
  };
};

export { quantumUiReact };
