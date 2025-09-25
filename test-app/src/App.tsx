import { createWizard } from "./wizard/createWizard";

import { HomePage } from "./pages";
import { Provider } from "./wizard/react/Provider";
const wizard = createWizard(
  [
    {
      name: "stepOne",
      visible: true,
    },
    {
      name: "stepTwo",
      visible: true,
    },
  ],
  {
    activeStep: "stepOne",
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
      <Provider value={wizard}>
        <HomePage />
      </Provider>
    </div>
  );
}

export default App;
