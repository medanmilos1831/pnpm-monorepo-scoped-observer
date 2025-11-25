import { quantumUiReact } from "../quantum-ui-react";
// import { Store } from "@tanstack/store";
// const counterStore = new Store({
//   count: () => {
//     console.log("count");
//   },
// });
// console.log(counterStore);

const { useModelSelector, useCreateModel } =
  quantumUiReact.createModule<number>({
    name: "counter",
    // model treba da se uradi rename na STORE
    model: (props: any) => {
      return {
        id: props.id,
        state: props.state,
      };
    },
  });
// counterModule.createModel({
//   id: "counter",
//   state: 0,
// });
// const model = counterModule.getModelById("counter")!;
// console.log(model);

// const unsubscribe = model.subscribe((payload) => {
//   console.log("PAYLOAD", payload);
// });
const HomePage = () => {
  const model = useModelSelector("counter");
  console.log(model);
  useCreateModel({ id: "counter", state: 0 });
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
