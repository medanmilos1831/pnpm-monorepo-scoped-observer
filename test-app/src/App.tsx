import { createWizzard } from "./wizzard/createWizzard";

import { HomePage } from "./pages";
import { Provider } from "./wizzard/Provider";
const wizzard = createWizzard(
  [
    {
      name: "stepOne",
      visible: true,
      validators: {
        onNext: (step, resolve, reject) => {
          reject({
            payload: {
              message: "StepOne is rejected",
            },
          });
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
      <Provider value={wizzard}>
        <HomePage />
      </Provider>
    </div>
  );
}

export default App;
