import { HomePage } from "./pages";

type ModuleFactory<S, T> = (state: S) => T;
type ModuleMap<S> = Record<string, ModuleFactory<S, any>>;

function createModule<S, M extends ModuleMap<S>>(state: S, modules: M) {
  type Built = { [K in keyof M]: ReturnType<M[K]> };

  const built = {} as Built;
  (Object.keys(modules) as Array<keyof M>).forEach((key) => {
    built[key] = modules[key](state);
  });

  return {
    state,
    modules: built,
  };
}

const nesto = createModule(
  { fname: "Milos" },
  {
    moduleOne(state) {
      return {
        printName(s: string, age: number) {
          console.log(state.fname);
        },
      };
    },
  }
);

nesto.modules.moduleOne.printName("Milos", 20);

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "black",
        color: "white",
      }}
    >
      <HomePage />
    </div>
  );
}

export default App;
