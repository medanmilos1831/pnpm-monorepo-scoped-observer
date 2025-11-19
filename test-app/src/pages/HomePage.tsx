import { useEffect, useState, useSyncExternalStore } from "react";
import { framework } from "../quantum";
import { quantumUiReact } from "../quantum-ui-react";

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
  commands: {
    onOpen: () => void;
    onClose: () => void;
  };
}
const toggleModule = framework.createModule<
  ToggleState,
  ToggleMutations,
  ToggleGetters,
  ToggleApiClient
>({
  name: "toggle-module",
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

const quantumUi = quantumUiReact(toggleModule);
console.log(quantumUi);

const SomeComponent = () => {
  const model = quantumUi.useModelSelector("some-model");
  console.log(model);
  return (
    <div>
      <h1>Some Component</h1>
    </div>
  );
};
const SomeComponent2 = () => {
  const model = toggleModule.createModel({
    id: "some-model",
    initState: "open",
  });
  useEffect(() => {
    return () => {
      toggleModule.removeModel("some-model");
    };
  }, []);
  return (
    <div>
      <h1>Some Component 2</h1>
    </div>
  );
};

const HomePage = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <SomeComponent />
      {count % 2 === 0 && <SomeComponent2 />}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  );
  // toggleModule.createModel({ id: "some-model", initState: "open" });
  // setTimeout(() => {
  //   toggleModule.removeModel("some-model");
  // }, 1000);
  // const [mount] = useState(() => {
  //   return (notify: () => void) => {
  //     return toggleModule.onModelMount("toggle", (payload) => {
  //       notify();
  //     });
  //   };
  // });
  // const [snapshot] = useState(() => () => {
  //   return toggleModule.getModelById("toggle");
  // });
  // const value = useSyncExternalStore(mount, snapshot);
  // toggleModule.createModel({ id: "toggle", initState: "open" });
  // console.log("SYNC EXTERNAL STORE", value);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
