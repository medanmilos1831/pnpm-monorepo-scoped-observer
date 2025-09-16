import { createBrowserWizzard, Provider, Wizzard } from "./wizzard";

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <Wizzard
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
        <Wizzard.Body>
          {(props) => {
            console.log("props", props);
            return <div>Body</div>;
          }}
        </Wizzard.Body>
        <Wizzard.Controls>
          {(props) => {
            console.log("props", props);
            return <div>Controls</div>;
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
