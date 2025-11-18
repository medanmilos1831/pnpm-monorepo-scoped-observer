import { framework } from "@med1802/quantum-ui";
interface ToggleProps {
  id: string;
  initState: "open" | "close";
}
interface ToggleState {
  status: "open" | "close";
}
interface ToggleMutations {
  onOpen: () => void;
  onClose: () => void;
}
interface ToggleGetters {
  getStatus: () => "open" | "close";
}
interface ToggleApiClient {
  onOpen: () => void;
  onClose: () => void;
}
const toggleModule = framework.createModule<
  ToggleState,
  ToggleMutations,
  ToggleGetters,
  ToggleApiClient
>({
  name: "toggle",
  model: (props: ToggleProps) => {
    return {
      id: props.id,
      state: {
        status: props.initState,
      },
      mutations(state) {
        return {
          onOpen: () => {
            state.status = "open";
          },
          onClose: () => {
            state.status = "close";
          },
        };
      },
      getters(state) {
        return {
          getStatus: () => state.status,
        };
      },
    };
  },
  modelClient: (model, broker) => {
    return {
      commands: {
        onOpen: () => {
          model.mutations.onOpen();
          broker.publish({
            eventName: "onChange",
            payload: model.getters.getStatus(),
          });
        },
        onClose: () => {
          model.mutations.onClose();
          broker.publish({
            eventName: "onChange",
            payload: model.getters.getStatus(),
          });
        },
      },
    };
  },
});
const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
