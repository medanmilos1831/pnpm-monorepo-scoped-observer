import { useActiveStep } from "../wizard";
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
  const { name: currentStep } = useActiveStep();
  const StepComponent = stepComponents[
    currentStep as keyof typeof stepComponents
  ] as any;
  // Render current step component
  return (
    <div>
      <h2>Wizard Body - Current Step: {currentStep}</h2>
      {StepComponent ? (
        <StepComponent />
      ) : (
        <div>Step not found: {currentStep}</div>
      )}
    </div>
  );
};

export { WizardBody };
