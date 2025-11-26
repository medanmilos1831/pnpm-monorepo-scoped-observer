import { quantumUi } from "../quantum";
const counterModule = quantumUi.createModule<number>({
  name: "counter",
  store: (props) => {
    return {
      id: props.id,
      state: props.state,
    };
  },
});
console.log(counterModule);
counterModule.onEntityLoad("counter", (payload) => {
  console.log(payload);
});
counterModule.onEntityDestroy("counter", (payload) => {
  console.log(payload);
});
counterModule.createEntity({
  id: "counter",
  state: 0,
});
setTimeout(() => {
  const counter = counterModule.getEntityById("counter");
  counter?.destroy();
}, 1000);
const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
