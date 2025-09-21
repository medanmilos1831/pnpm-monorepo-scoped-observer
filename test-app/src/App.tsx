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
            payload: "error",
          });
          // return false;
        },
        onPrev: () => true,
      },
    },
    {
      name: "stepTwo",
      visible: true,
      validators: {
        onNext: () => true,
        onPrev: () => true,
      },
    },
    {
      name: "stepThree",
      visible: false,
      validators: {
        onNext: () => true,
        onPrev: () => true,
      },
    },
    {
      name: "stepFour",
      visible: true,
      validators: {
        onNext: () => true,
        onPrev: () => true,
      },
    },
  ],
  {
    activeStep: "stepOne",
  }
);
function App() {
  return (
    <Provider value={wizzard}>
      <HomePage />
    </Provider>
  );
}

export default App;
