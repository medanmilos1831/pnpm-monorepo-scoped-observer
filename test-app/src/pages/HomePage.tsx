import { quantumUiReact } from "../quantum-ui-react";
// import { quantumUi } from "../quantum";
// import { Store } from "@tanstack/store";
// const counterStore = new Store({
//   count: () => {
//     console.log("count");
//   },
// });
// console.log(counterStore);

const { useStoreSelector, useCreateStore } =
  quantumUiReact.createModule<number>({
    name: "counter",
    store: (props) => {
      return {
        id: props.id,
        state: props.state,
      };
    },
  });
// const counterModule = quantumUi.createModule<number>({
//   name: "counter",
//   store: (props) => {
//     return {
//       id: props.id,
//       state: props.state,
//     };
//   },
// });
// counterModule.createStore({
//   id: "counter",
//   state: 0,
// });
// const counterStore = counterModule.getStoreById("counter")!;
// counterStore.store.subscribe((payload) => {
//   console.log("PAYLOAD", payload);
// });

// const unsubscribe = model.subscribe((payload) => {
//   console.log("PAYLOAD", payload);
// });
const HomePage = () => {
  useCreateStore({ id: "counter", state: 0 });
  const model = useStoreSelector("counter");
  console.log(model);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
