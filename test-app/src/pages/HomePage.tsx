// import { quantumUiReact } from "../quantum-ui-react";
import { quantumUi } from "../quantum";
// import { Store } from "@tanstack/store";
// const counterStore = new Store({
//   count: () => {
//     console.log("count");
//   },
// });
// console.log(counterStore);

// const { useModelSelector, useCreateModel } =
//   quantumUiReact.createModule<number>({
//     name: "counter",
//     // model treba da se uradi rename na STORE
//     model: (props: any) => {
//       return {
//         id: props.id,
//         state: props.state,
//       };
//     },
//   });
const counterModule = quantumUi.createModule<number>({
  name: "counter",
  store: (props) => {
    return {
      id: props.id,
      state: props.state,
    };
  },
});
counterModule.subscribe((payload) => {
  console.log("TRIGGERED ON CREATE COUNTER STORE", payload);
}, "onStoreCreate-counter");
counterModule.subscribe((payload) => {
  console.log("TRIGGERED ON DESTROY COUNTER STORE", payload);
}, "onStoreDestroy-counter");

counterModule.createStore({
  id: "counter",
  state: 0,
});
const counterStore = counterModule.getStoreById("counter")!;
counterStore.destroy();

// const unsubscribe = model.subscribe((payload) => {
//   console.log("PAYLOAD", payload);
// });
const HomePage = () => {
  // const model = useModelSelector("counter");
  // console.log(model);
  // useCreateModel({ id: "counter", state: 0 });
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
