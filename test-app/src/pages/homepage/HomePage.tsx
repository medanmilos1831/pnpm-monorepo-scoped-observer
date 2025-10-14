import { StepOne } from "../../components/StepOne";
import { StepThree } from "../../components/StepThree";
import { StepTwo } from "../../components/StepTwo";
import { Wizard, getClient } from "../../wiz";
import { useStep, useWizardCommands } from "../../wizard/";
import { WizardEvents } from "../../wizard/types";
import { StepFour } from "../../components/StepFour";
import { StepFive } from "../../components/StepFive";

const StepMap: Record<string, React.ComponentType> = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
  stepFour: StepFour,
  stepFive: StepFive,
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

const WizardBodyTwo = () => {
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
              FINISH WIZARD ONE
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <Wizard
        id="wizardTwo"
        steps={["stepFour", "stepFive"]}
        activeStep={"stepFour"}
        onReset={() => {}}
        onFinish={({ reset, renderOnFinish }: any) => {
          renderOnFinish();
          reset();
        }}
        renderOnFinish={({ reset }: { reset: () => void }) => {
          return (
            <div>
              FINISH WIZARD TWO
              <button onClick={() => reset()}>reset</button>
            </div>
          );
        }}
      >
        <WizardNavigation />
        <br />
        <WizardBodyTwo />
        <div style={{ marginTop: "20px" }}>
          <Controls />
        </div>
      </Wizard>
      <br />
    </>
  );
};

export { HomePage };
