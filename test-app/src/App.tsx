import { createWizard } from "./wizard/createWizard";
import { Form } from "antd";

import { HomePage } from "./pages";
import { WizzardProvider } from "./wizard/react-intergation";
const wizard = createWizard(
  {
    activeStep: "stepOne",
  },
  {
    steps: ["stepOne", "stepTwo", "stepThree", "stepFour", "stepFive"],
    activeSteps: ["stepOne", "stepTwo", "stepThree", "stepFour", "stepFive"],
  }
);

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <WizzardProvider value={wizard}>
        <HomePage />
      </WizzardProvider>
    </div>
  );
}

export default App;
