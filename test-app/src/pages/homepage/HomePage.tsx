import { StepOne } from "../../components/StepOne";
import { StepThree } from "../../components/StepThree";
import { StepTwo } from "../../components/StepTwo";
import { Wizard, getClient } from "../../wiz";
import { useStep, useWizardCommands } from "../../wizard/";
import { WizardEvents } from "../../wizard/types";

const SomeComponent = () => {
  getClient("wizard").subscribe(WizardEvents.ON_STEP_CHANGE, (params: any) => {
    console.log("ON_STEP_CHANGE", params);
  });
  return (
    <div>
      <button onClick={() => getClient("wizard").next()}>Next</button>
      <button onClick={() => getClient("wizard").previous()}>Previous</button>
      <button onClick={() => getClient("wizard").reset()}>Reset</button>
    </div>
  );
};

const StepMap = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
};

const WizardNavigation = () => {
  const { steps } = useStep();
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {steps.map((step: string) => (
        <div key={step}>{step}</div>
      ))}
    </div>
  );
};

const Controls = () => {
  const { next, previous, reset } = useWizardCommands();
  return (
    <div>
      <button
        onClick={() =>
          previous({
            actionType: "validation",
          })
        }
      >
        Previous
      </button>
      <button
        onClick={() =>
          next({
            actionType: "validation",
          })
        }
      >
        Next
      </button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
};

const WizardBody = () => {
  const { stepName } = useStep();
  const Step = StepMap[stepName as keyof typeof StepMap];
  return (
    <>
      <Step />
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <Wizard
        id="wizard"
        steps={["stepOne", "stepTwo"]}
        activeStep={"stepOne"}
        onReset={() => {}}
        onFinish={({ reset, renderOnFinish }: any) => {
          renderOnFinish();
          reset();
        }}
        renderOnFinish={({ reset }: { reset: () => void }) => {
          return (
            <div>
              <button onClick={() => reset()}>reset</button>
            </div>
          );
        }}
      >
        <WizardNavigation />
        <br />
        <WizardBody />
        <div style={{ marginTop: "20px" }}>
          <Controls />
        </div>
      </Wizard>
      <SomeComponent />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export { HomePage };
