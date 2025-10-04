import { Controls } from "../../components/Controls";
import { Navigation } from "../../components/Navigation";
import { WizardBody } from "../../components/WizardBody";
import { useOnStatusChange, useWizzard, Wizzard } from "../../wizard";

const InnerPage = () => {
  const status = useOnStatusChange();
  const { reset } = useWizzard();
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
  return (
    <>
      <Wizzard
        name="wizardOne"
        config={{
          activeStep: "stepOne",
        }}
        steps={{ activeSteps: ["stepOne", "stepTwo"] }}
      >
        <InnerPage />
      </Wizzard>
    </>
  );
};

export { HomePage };
