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

const Controls = () => {
  const { next, previous } = useWizardCommands();
  return (
    <div>
      <button onClick={() => previous()}>Previous</button>
      <button
        onClick={() =>
          next({
            actionType: "validation",
          })
        }
      >
        Next
      </button>
    </div>
  );
};

const WizardBody = () => {
  const step = useStep();
  const Step = StepMap[step as keyof typeof StepMap];
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
        steps={["stepOne", "stepTwo", "stepThree"]}
        activeStep={"stepOne"}
      >
        <WizardBody />
        <Controls />
      </Wizard>
    </>
  );
};

export { HomePage };
