import { quantumUi } from "../quantum";
interface IState {
  count: number;
}
interface IMutations {
  increment: () => void;
  decrement: () => void;
}
interface IGetters {
  getCount: () => number;
}
interface ICommands {
  increment: () => void;
}
const framework = quantumUi.createModule({
  id: "counterModule",
  model: (props: any) => {
    return {
      id: props.id,
      state: {
        count: 0,
      },
      mutations(state: any) {
        return {
          increment: () => {
            state.count++;
          },
          decrement: () => {
            state.count--;
          },
        };
      },
      getters(state: any) {
        return {
          getCount: () => state.count,
        };
      },
    };
  },
  modelClient: (model: any, broker: any) => {
    return {
      commands: {
        increment: () => {
          model.mutations;
        },
      },
    };
  },
});
const HomePage = () => {
  const pera = framework.createModel({ id: "counter", state: { count: 0 } });
  console.log(pera);
  // const model = framework.getModelById("counter");
  // console.log(model);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
