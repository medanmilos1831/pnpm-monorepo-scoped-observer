import { createWizard } from "./wizard/createWizard";
import { Form } from "antd";

import { HomePage } from "./pages";
import { WizzardProvider } from "./wizard/react-intergation";
const wizard = createWizard({
  activeStep: "stepOne",
});
console.log("wizard", wizard);
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
