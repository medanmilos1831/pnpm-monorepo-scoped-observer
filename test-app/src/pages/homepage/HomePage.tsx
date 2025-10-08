import { useState } from "react";
import { Controls } from "../../components/Controls";
import { Navigation } from "../../components/Navigation";
import { WizardBody } from "../../components/WizardBody";

import { logGarage, Wizard, getWizard } from "../../wiz";
import { useStatus, useWizardCommands } from "../../wizard";

const SomeComponent = () => {
  // getWizard("wizardOne")!.subscribe({
  //   eventName: "onNext",
  //   callback: (payload: any) => {
  //   },
  // });
  return <div>SomeComponent</div>;
};

const InnerPage = () => {
  const status = useStatus();
  const { reset } = useWizardCommands();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {status === "success" ? (
        <>
          <button onClick={() => reset()}>Reset</button>
        </>
      ) : (
        <>
          <Navigation />
          <WizardBody />
          <Controls />
        </>
      )}
    </div>
  );
};

const HomePage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <button onClick={() => logGarage()}>WIZZARD GARAGE</button>
      <div>Counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button>Next</button>
      {counter % 2 === 0 ? (
        <>
          <Wizard
            name="wizardOne"
            config={{
              activeStep: "stepOne",
            }}
            wizardStepsConfig={{ activeSteps: ["stepOne", "stepTwo"] }}
          >
            <InnerPage />
          </Wizard>
          <SomeComponent />
        </>
      ) : (
        <div>nema</div>
      )}
    </>
  );
};

export { HomePage };
