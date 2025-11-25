import { quantumUi } from "../quantum";
// import { Store } from "@tanstack/store";
// const counterStore = new Store({
//   count: () => {
//     console.log("count");
//   },
// });
// console.log(counterStore);

const counterModule = quantumUi.createModule<number>({
  name: "counter",
  model: (props) => {
    return {
      id: props.id,
      state: props.state,
    };
  },
});
counterModule.createModel({
  id: "counter",
  state: 0,
});
counterModule.subscribe((payload) => {
  console.log("PAYLOAD", payload);
});
const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
