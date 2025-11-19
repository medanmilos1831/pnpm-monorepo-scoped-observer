import { quantumUiReact } from "../quantum-ui-react";
const quantumUi = quantumUiReact();
// console.log(quantumUi);
interface ToggleState {
  count: number;
}
interface ToggleMutations {
  increment: () => void;
}
interface ToggleGetters {
  getCount: () => number;
}
interface ToggleApiClient {
  commands: {
    increment: () => void;
  };
}
const toggleModule = quantumUi.createModule<
  ToggleState,
  ToggleMutations,
  ToggleGetters,
  ToggleApiClient
>({
  name: "toggleModule",
  model(props) {
    return {
      id: props.id,
      state: props.initState,
      mutations(state) {
        return {
          increment: () => {
            state.count++;
          },
        };
      },
      getters(state) {
        return {
          getCount: () => state.count,
        };
      },
    };
  },
  modelClient: (model, broker) => {
    return {
      commands: {
        increment: () => {
          model.mutations.increment();
        },
      },
    };
  },
});

const SomeHeader = () => {
  const toggleModel = toggleModule.useModelSelector("toggle-model-modal");
  console.log("MODEL IN HEADER", toggleModel);
  return <div>SomeHeader</div>;
};

const SomeContent = () => {
  const toggleModel = toggleModule.useModelSelector("toggle-model-modal");
  // console.log("toggleModel", toggleModel);
  return <div>SomeContent</div>;
};

const SomeFooter = () => {
  toggleModule.useCreateModel({
    id: "toggle-model-modal",
    initState: {
      count: 0,
    },
  });
  const model = toggleModule.getModelById("toggle-model-modal");
  console.log("FOOTER MODEL", model);
  // const toggleModel = toggleModule.useModelSelector("toggle-model-modal");
  // console.log("toggleModel", toggleModel);
  return <div>SomeFooter</div>;
};

const HomePage = () => {
  // const toggleModel = toggleModule.useModelSelector("toggle-model-modal");
  // console.log("toggleModel", toggleModel);
  // toggleModule.useCreateModel({
  //   id: "toggle-model-modal",
  //   initState: {
  //     count: 0,
  //   },
  // });
  // const toggleModelModal = toggleModule.getModelById("toggle-model-modal");
  // console.log(toggleModelModal);
  // const toggleModel = toggleModule.useModelSelector("toggleModule");
  // console.log(toggleModel);
  return (
    <div>
      <div>
        <SomeHeader />
      </div>
      <div>
        <SomeContent />
      </div>
      <div>
        <SomeFooter />
      </div>
    </div>
  );
};

export { HomePage };
