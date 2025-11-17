import { framework } from "../quantum-ui/framework";

export enum INITIAL_STATE {
  ON = "on",
  OFF = "off",
}

export type initialStateType = `${INITIAL_STATE}`;

export type VisibilityProps = {
  id: string;
  initState: initialStateType;
};

interface IEntityState {
  visibility: "on" | "off";
}

interface IEntityMutations {
  setVisibility: (visibility: "on" | "off") => void;
}

interface IEntityGetters {
  getVisibility: () => "on" | "off";
}

interface ICommands {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

interface ISubscribers {
  onChange: (callback: (payload: "on" | "off") => void) => () => void;
}

interface IModelClient {
  getVisibility: () => "on" | "off";
  subscribers: ISubscribers;
  commands: ICommands;
}

interface IEntityApiClient {
  commands: ICommands;
  subscribers: ISubscribers;
  getVisibility: () => "on" | "off";
  modelClient: () => IModelClient;
}
const toggleModule = framework.createModule<
  IEntityState,
  IEntityMutations,
  IEntityGetters,
  IEntityApiClient
>({
  name: "VISIBILITY_CLIENT",
  model: (props: VisibilityProps) => {
    return {
      id: props.id,
      state: {
        visibility: "off",
      },
      mutations(state) {
        return {
          setVisibility: (visibility: "on" | "off") => {
            state.visibility = visibility;
          },
        };
      },
      getters(state) {
        return {
          getVisibility: () => state.visibility,
        };
      },
    };
  },
  apiClient: (model, broker) => {
    const commands = {
      onOpen: () => {
        model.mutations.setVisibility("on");
        broker.publish({
          eventName: "onChange",
          payload: "on",
        });
      },
      onClose: () => {
        model.mutations.setVisibility("off");
        broker.publish({
          eventName: "onChange",
          payload: "off",
        });
      },
      onToggle: () => {
        model.mutations.setVisibility(
          model.getters.getVisibility() === "on" ? "off" : "on"
        );
        broker.publish({
          eventName: "onChange",
          payload: model.getters.getVisibility() === "on" ? "off" : "on",
        });
      },
    };
    const subscribers = {
      onChange: (callback: (payload: "on" | "off") => void) => {
        return broker.subscribe({
          eventName: "onChange",
          callback,
        });
      },
    };
    return {
      commands,
      subscribers,
      getVisibility: model.getters.getVisibility,
      modelClient() {
        return {
          getVisibility: model.getters.getVisibility,
          subscribers,
          commands,
        };
      },
    };
  },
  // modelApiClient(stateManager, broker) {
  //   const commands = {
  //     onOpen: () => {
  //       broker.publish({
  //         eventName: "onChange",
  //         payload: "on",
  //       });
  //     },
  //     onClose: () => {
  //       broker.publish({
  //         eventName: "onChange",
  //         payload: "off",
  //       });
  //     },
  //     onToggle: () => {
  //       broker.publish({
  //         eventName: "onChange",
  //         payload: stateManager.getters.getVisibility() === "on" ? "off" : "on",
  //       });
  //     },
  //   };
  //   return {
  //     commands,
  //     subscribers: {
  //       onChange: (notify: () => void) => {
  //         return broker.subscribe({
  //           eventName: "onChange",
  //           callback: ({ payload }: { payload: "on" | "off" }) => {
  //             stateManager.mutations.setVisibility(payload);
  //             notify();
  //           },
  //         });
  //       },
  //     },
  //     selectors: {
  //       subscribe: (
  //         eventName: "onChange",
  //         callback: (payload: any) => void
  //       ) => {
  //         return broker.subscribe({
  //           eventName,
  //           callback,
  //         });
  //       },
  //       commands,
  //     },
  //     getVisibility: () => stateManager.getters.getVisibility(),
  //   };
  // },
  // channel(model, broker) {
  //   return {
  //     change: {
  //       publish(value: "on" | "off") {
  //         model.mutations.setVisibility(value);
  //         broker.publish({
  //           eventName: "onChange",
  //           payload: value,
  //         });
  //       },
  //       subscribe(callback: (payload: any) => void) {
  //         return broker.subscribe({
  //           eventName: "onChange",
  //           callback: (payload: any) => {
  //             callback(payload);
  //           },
  //         });
  //       },
  //     },
  //   };
  // },
});

export { toggleModule };
