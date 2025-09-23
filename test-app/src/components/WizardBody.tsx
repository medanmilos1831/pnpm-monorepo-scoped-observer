import { useStep } from "../wizard";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";

const stepComponents = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
  stepFour: StepFour,
};

const WizardBody = () => {
  const { step } = useStep();
  const StepComponent = stepComponents[step as keyof typeof stepComponents];

  return (
    <div>
      helloo
      <h2>Wizard Body - Current Step: {step}</h2>
      {StepComponent ? <StepComponent /> : <div>Step not found: {step}</div>}
    </div>
  );
};

export { WizardBody };
