import { useState } from "react";
import { Controls } from "../../components/Controls";
import { Navigation } from "../../components/Navigation";
import { WizardBody } from "../../components/WizardBody";
import { browserWizard } from "../../wiz";
import { useOnStatusChange, useWizardCommands, Wizzard } from "../../wizard";

const InnerPage = () => {
  const status = useOnStatusChange();
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
      <button
        onClick={() => {
          console.log(browserWizard.getGarage());
        }}
      >
        WIZZARD GARAGE
      </button>
      <div>Counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      {counter % 2 === 0 ? (
        <Wizzard
          name="wizardOne"
          config={{
            activeStep: "stepOne",
          }}
          steps={{ activeSteps: ["stepOne", "stepTwo"] }}
        >
          <InnerPage />
        </Wizzard>
      ) : (
        <div>nema</div>
      )}
    </>
  );
};

export { HomePage };
