import { useStep } from "../wizard";
import { StepFive } from "./StepFive";
import { StepFour } from "./StepFour";
import { StepOne } from "./StepOne";
import { StepThree } from "./StepThree";
import { StepTwo } from "./StepTwo";

const stepComponents: any = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
  stepFour: StepFour,
  stepFive: StepFive,
};

const WizardBody = () => {
  // Render current step component
  const { stepName } = useStep() as any;
  const StepComponent = stepComponents[stepName] as any;
  return (
    <div>
      <StepComponent />
    </div>
  );
};

export { WizardBody };
