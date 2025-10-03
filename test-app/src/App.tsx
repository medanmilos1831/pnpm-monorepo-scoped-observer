import { createWizardClient } from "./wizard";

import { HomePage } from "./pages";
import { WizzardProvider } from "./wizard/react-intergation";
const wizard = createWizardClient(
  {
    activeStep: "stepOne",
  },
  {
    activeSteps: ["stepOne", "stepTwo"],
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
