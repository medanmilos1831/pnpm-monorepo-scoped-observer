import { createWizard } from "./wizard/createWizard";
import { Form } from "antd";

import { HomePage } from "./pages";
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
      <Form.Item name="wizard">
        <HomePage />
      </Form.Item>
    </div>
  );
}

export default App;
