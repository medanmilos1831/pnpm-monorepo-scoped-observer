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
          resolve();
          // reject({
          //   payload: {
          //     message: "StepOne is rejected",
          //   },
          // });
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
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Provider value={wizard}>
        <HomePage />
      </Provider>
    </div>
  );
}

export default App;
