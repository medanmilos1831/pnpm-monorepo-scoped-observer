import { quantumUi } from "../quantum";
const framework = quantumUi.createModule({
  name: "counterModule",
  model: (props: any) => {
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

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
