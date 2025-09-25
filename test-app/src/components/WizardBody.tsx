import { WizzardProvider } from "../wizard";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";

const stepComponents = {
  stepOne: StepOne,
  stepTwo: StepTwo,
};

const WizardBody = () => {
  return (
    <div>
      <WizzardProvider.Step
        onNext={() => {
          console.log("onNext");
        }}
      >
        <>step one</>
      </WizzardProvider.Step>
    </div>
  );
};

export { WizardBody };
