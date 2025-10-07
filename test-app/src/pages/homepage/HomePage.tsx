import { useState } from "react";
import { Controls } from "../../components/Controls";
import { Navigation } from "../../components/Navigation";
import { WizardBody } from "../../components/WizardBody";
import { useOnStatusChange, useStep, useWizardCommands } from "../../wizard";
import { logGarage, Wizard } from "../../wiz";

const InnerPage = () => {
  // const status = useOnStatusChange();
  // const { reset } = useWizardCommands();
  useStep();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {status === "success" ? (
        <>{/* <button onClick={() => reset()}>Reset</button> */}</>
      ) : (
        <>
          <>wizzard elements</>
          {/* <Navigation /> */}
          {/* <WizardBody /> */}
          {/* <Controls /> */}
        </>
      )}
    </div>
  );
};

const HomePage = () => {
  const [counter, setCounter] = useState(0);
  // console.log(browserWizard.getWizard("wizardOne"));
  // const wizard = useCreateWizzard({
  //   name: "wizardOne",
  //   config: {
  //     activeStep: "stepOne",
  //   },
  //   steps: { activeSteps: ["stepOne", "stepTwo"] },
  // });
  return (
    <>
      <button onClick={() => logGarage()}>WIZZARD GARAGE</button>
      <div>Counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button>Next</button>
      {counter % 2 === 0 ? (
        <Wizard
          name="wizardOne"
          config={{
            activeStep: "stepOne",
          }}
          wizardStepsConfig={{ activeSteps: ["stepOne", "stepTwo"] }}
        >
          <InnerPage />
        </Wizard>
      ) : (
        <div>nema</div>
      )}
    </>
  );
};

export { HomePage };
