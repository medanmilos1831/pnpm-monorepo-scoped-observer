import { StepFive } from "./StepFive";
import { StepFour } from "./StepFour";
import { StepOne } from "./StepOne";
import { StepThree } from "./StepThree";
import { StepTwo } from "./StepTwo";

const stepComponents = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
  stepFour: StepFour,
  stepFive: StepFive,
};

const WizardBody = () => {
  // Render current step component
  return (
    <div>
      <>Wizard Body</>
    </div>
  );
};

export { WizardBody };
