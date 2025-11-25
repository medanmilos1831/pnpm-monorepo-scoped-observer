import { quantumUi } from "@med1802/quantum-ui";

const counterModule = quantumUi.createModule<number>({
  name: "counter",
  store: (props) => {
    return {
      id: props.id,
      state: props.state,
    };
  },
});

counterModule.createStore({
  id: "counter",
  state: 0,
});
const counterStore = counterModule.getStoreById("counter")!;

counterStore.store.subscribe((payload) => {
  console.log("PAYLOAD", payload);
});
counterStore.store.subscribe((payload) => {
  console.log("PAYLOAD CUSTOM EVENT", payload);
}, "triggerOnlyOnCustomEvent");
counterStore.store.setState((state) => state + 1);
counterStore.store.setState((state) => state + 1, {
  customEvents: ["triggerOnlyOnCustomEvent"],
});

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
