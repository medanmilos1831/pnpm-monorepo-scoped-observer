import { useOnStepChange, WizzardProvider } from "../wizard";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";
import { StepFive } from "./StepFive";

const stepComponents = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
  stepFour: StepFour,
  stepFive: StepFive,
};

const WizardBody = () => {
  const currentStep = useOnStepChange();
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
