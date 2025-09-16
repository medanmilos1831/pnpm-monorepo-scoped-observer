import { createBrowserWizzard, Provider, Wizzard } from "./wizzard";
import { useStep } from "./wizzard/Provider";

const One = () => {
  const step = useStep();
  return (
    <div>
      <button onClick={() => step.setCompleted(true)}>answer one</button>
      <button onClick={() => step.setCompleted(true)}>answer two</button>
      <button onClick={() => step.setCompleted(true)}>answer three</button>
    </div>
  );
};

const Two = () => {
  return <div>Two</div>;
};

const Three = () => {
  return <div>Three</div>;
};

const Four = () => {
  return <div>Four</div>;
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
          defaultSteps: ["one", "two"],
        }}
      >
        <Wizzard.Navigation>
          {(props) => {
            console.log("props", props);
            return <div>Navigation</div>;
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
            return (
              <div>
                <button onClick={props.prevStep}>prev</button>
                <button onClick={props.nextStep}>next</button>
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
