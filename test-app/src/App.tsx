import { createWizzard } from "./wizzard/createWizzard";
import { Provider } from "./wizzard/Provider";
import { HomePage } from "./pages";
const wizzard = createWizzard({
  name: "wizard",
  steps: ["stepOne", "stepTwo", "stepThree", "stepFour"],
  activeStep: "stepOne",
  activeSteps: ["stepOne", "stepTwo", "stepThree"],
});
function App() {
  return (
    <Provider value={wizzard}>
      <HomePage />
    </Provider>
  );
}

export default App;
