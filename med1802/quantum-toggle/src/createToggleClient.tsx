import { quantumUiModuleReact } from "@med1802/quantum-ui-module-react";
import { useSyncExternalStore } from "react";
import { toggleModule } from "./toggleModule";
import { ToggleProps } from "./types";

const createToggleClient = () => {
  const quantumUiModule = quantumUiModuleReact(toggleModule);
  return {
    useToggle: (props: ToggleProps) => {
      quantumUiModule.useCreateModel(props.id);
      const model = toggleModule.getModelById(props.id);
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
    useToggleSelector: quantumUiModule.useModelSelector,
    getToggleClient: (id: string) => {
      const model = toggleModule.getModelById(id);
      return model;
    },
  };
};

export { createToggleClient };
