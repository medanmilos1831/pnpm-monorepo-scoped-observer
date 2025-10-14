import { Wizard, WizardStep } from "../../wiz";
import { useWizardCommands, useStep } from "../../wizard/";
import { StepOne } from "../../components/StepOne";
import { StepTwo } from "../../components/StepTwo";
import { StepThree } from "../../components/StepThree";

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
        onReset={() => {
        }}
        onFinish={({ reset }: any) => {
          reset();
        }}
      >
        <WizardNavigation />
        <br />
        <WizardBody />
        <div style={{ marginTop: "20px" }}>
          <Controls />
        </div>
      </Wizard>
    </>
  );
};

export { HomePage };
