import { useEffect, useState } from "react";
import { createBrowserWizzard, Provider, Wizzard } from "./wizzard";
import { useStep } from "./wizzard/Provider";

const One = () => {
  const {
    getState,
    setState: setStepState,
    setIsChanged,
    setCompleted,
    isCompleted,
    subscribePera,
    intreceptor,
  } = useStep();
  const [state, setState] = useState<any>(getStepState);
  function getStepState() {
    return getState((state: any) => {
      return state;
    });
  }
  useEffect(() => {
    if (isCompleted && state.id !== getStepState()?.id) {
      alert("completed");
    }
  }, []);
  return (
    <div>
      <h1>One</h1>
      <button
        onClick={() => {
          setState((prev: any) => {
            return {
              ...prev,
              id: 1,
              list: ["test 2 1", "test 2 2"],
            };
          });
        }}
      >
        answer one
      </button>
      <button
        onClick={() => {
          setState((prev: any) => {
            return {
              ...prev,
              id: 2,
              list: ["test 2 3", "test 2 4"],
            };
          });
          setCompleted(true);
        }}
      >
        answer two
      </button>
      <button
        onClick={() => {
          setCompleted(true);
          setState((prev: any) => {
            return {
              ...prev,
              id: 3,
              list: ["test 2 5", "test 2 6"],
            };
          });
        }}
      >
        answer three
      </button>
    </div>
  );
};

const Two = () => {
  const step = useStep();
  return (
    <div>
      <h1>Two</h1>
      <button onClick={() => step.setCompleted(true)}>1</button>
      <button onClick={() => step.setCompleted(true)}>2</button>
      <button onClick={() => step.setCompleted(true)}>all</button>
    </div>
  );
};

const Three = () => {
  const step = useStep();
  return (
    <div>
      <h1>Three</h1>
      <button onClick={() => step.setCompleted(true)}>1</button>
      <button onClick={() => step.setCompleted(true)}>2</button>
      <button onClick={() => step.setCompleted(true)}>all</button>
    </div>
  );
};

const Four = () => {
  const step = useStep();
  return (
    <div>
      <h1>Four</h1>
      <button onClick={() => step.setCompleted(true)}>1</button>
      <button onClick={() => step.setCompleted(true)}>2</button>
      <button onClick={() => step.setCompleted(true)}>all</button>
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
        <Wizzard.Navigation>
          {(props) => {
            return (
              <div>
                {props.visibleSteps.map((step: any) => {
                  return (
                    <div
                      key={step.name}
                      style={{
                        backgroundColor:
                          step.name === props.activeStep.name
                            ? "yellow"
                            : "white",
                        color: step.isCompleted ? "green" : "red",
                        fontSize: "5rem",
                        fontWeight: "bold",
                        margin: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #000",
                        cursor: "pointer",
                      }}
                    >
                      {step.name}
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Wizzard.Navigation>
        <br />
        <Wizzard.Body>
          {(props) => {
            const View = ViewMap[props.activeStep.name];
            return <View />;
          }}
        </Wizzard.Body>
        <br />
        <Wizzard.Controls>
          {(props) => {
            console.log("props", props);
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

function App() {
  return (
    <Provider value={createBrowserWizzard()}>
      <HomePage />
    </Provider>
  );
}

export default App;
