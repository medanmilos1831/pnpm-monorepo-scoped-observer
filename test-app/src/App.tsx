import { createWizard } from "./wizard/createWizard";

import { HomePage } from "./pages";
import { Provider } from "./wizard/react/Provider";
const wizard = createWizard(
  [
    {
      name: "stepOne",
      visible: true,
      validators: {
        onNext: (step, resolve, reject) => {
          if (step.stepHistory && step.state.id !== step.stepHistory?.id) {
            reject();
          } else {
            resolve();
          }
        },
        onPrev: () => true,
      },
    },
    {
      name: "stepTwo",
      visible: true,
      validators: {
        // onNext: () => true,
        // onPrev: () => true,
      },
    },
    {
      name: "stepThree",
      visible: true,
      validators: {
        // onNext: () => true,
        // onPrev: () => true,
      },
    },
    {
      name: "stepFour",
      visible: true,
      validators: {
        // onNext: () => true,
        // onPrev: () => true,
      },
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
