import { useState } from "react";
import {
  createBrowserWizzard,
  Provider,
  useStepMutation,
  useStepQuery,
  useWizzardLogging,
  Wizzard,
} from "./wizzard";

const One = () => {
  const [state, setState] = useState({
    fname: "John",
    lname: "Doe",
  });
  const { mutate } = useStepMutation({
    mutation: (params: any, step: any) => {
      return {
        ...step,
        ...params,
      };
    },
  });
  const selectedStepOne = useStepQuery({
    selector(step: any) {
      return step;
    },
  });
  console.log("RENDER ONE", selectedStepOne);
  const logging = useWizzardLogging();
  return (
    <div>
      <h1>One</h1>
      <button
        onClick={() => {
          mutate({
            isChanged: true,
            isCompleted: true,
            state: {
              id: 1,
              list: ["string", "string2"],
            },
          });
          // step.updateStep((prev: any) => {
          //   return {
          //     ...prev,
          //     isChanged: true,
          //     isCompleted: true,
          //     state: {
          //       id: 1,
          //       list: ["string", "string2"],
          //     },
          //   };
          // });
          // setState((prev: any) => {
          //   return {
          //     ...prev,
          //     id: 1,
          //     list: ["string", "string2"],
          //   };
          // });
          // step.isChanged = true;
        }}
      >
        answer one
      </button>
      <button
        onClick={() => {
          mutate({
            isChanged: true,
            isCompleted: true,
            state: {
              id: 2,
              list: ["string3", "string4"],
            },
          });
          // setState((prev: any) => {
          //   return {
          //     ...prev,
          //     id: 2,
          //     list: ["string3", "string4"],
          //   };
          // });
        }}
      >
        answer two
      </button>
      {/* <button
        onClick={() => {
          setState((prev: any) => {
            return {
              ...prev,
              id: 3,
              list: ["string5", "string6"],
            };
          });
        }}
      >
        answer three
      </button>
      <button
        onClick={() => {
          logging();
        }}
      >
        log
      </button> */}
    </div>
  );
};

const Two = () => {
  return (
    <div>
      <h1>Two</h1>
      {/* <button onClick={() => step.setCompleted(true)}>1</button>
      <button onClick={() => step.setCompleted(true)}>2</button>
      <button onClick={() => step.setCompleted(true)}>all</button> */}
    </div>
  );
};

const Three = () => {
  return (
    <div>
      <h1>Three</h1>
      {/* <button onClick={() => step.setCompleted(true)}>1</button>
      <button onClick={() => step.setCompleted(true)}>2</button>
      <button onClick={() => step.setCompleted(true)}>all</button> */}
    </div>
  );
};

const Four = () => {
  return (
    <div>
      <h1>Four</h1>
      {/* <button onClick={() => step.setCompleted(true)}>1</button>
      <button onClick={() => step.setCompleted(true)}>2</button>
      <button onClick={() => step.setCompleted(true)}>all</button> */}
    </div>
  );
};

const ViewMap: any = {
  one: () => <One />,
  two: () => <Two />,
  three: () => <Three />,
  four: () => <Four />,
};

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <Wizzard
        name="test"
        config={{
          name: "test",
          activeStep: "one",
          steps: ["one", "two", "three", "four"],
          defaultSteps: ["one", "two", "three", "four"],
        }}
      >
        <Wizzard.Body>
          {(props) => {
            const View = ViewMap[props.name];
            return <View />;
          }}
        </Wizzard.Body>
        <br />
        <Wizzard.Controls>
          {(props) => {
            return (
              <div>
                <button onClick={props.prevStep}>prev</button>
                <button
                  disabled={!props.stepCompleted}
                  onClick={props.nextStep}
                >
                  next
                </button>
              </div>
            );
          }}
        </Wizzard.Controls>
      </Wizzard>
    </div>
  );
};

let nextId = 0;
let todos = [{ id: nextId++, text: "Todo #1" }];
let listeners: any[] = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: "Todo #" + nextId }];
    emitChange();
  },
  subscribe(listener: any) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    console.log("eeeeee");
    return todos;
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

function App() {
  // const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);

  return (
    <Provider value={createBrowserWizzard()}>
      <HomePage />
    </Provider>
  );
}

export default App;

{
  /* <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul> */
}
