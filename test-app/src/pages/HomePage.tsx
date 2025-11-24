import { quantumUi } from "../quantum";
interface IState {
  count: number;
}
interface IMutations {
  increment: () => void;
}
interface IGetters {
  getCount: () => number;
}
interface ICommands {
  increment: () => void;
}
const framework = quantumUi.createModule<
  IState,
  IMutations,
  IGetters,
  ICommands
>({
  name: "counterModule",
  model: (props) => {
    return {
      id: props.id,
      state: {
        count: 0,
      },
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
  modelClient: (model) => {
    return {
      commands: {
        increment: () => {
          model.mutations.increment();
        },
      },
    };
  },
});
const HomePage = () => {
  framework.createModel({ id: "counter", state: { count: 0 } });
  const model = framework.getModelById("counter");
  console.log(model.modelClient);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
