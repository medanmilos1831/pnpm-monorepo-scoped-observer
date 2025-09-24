import { useOnStepChange } from "../wizard";
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
  const { step } = useOnStepChange((state: any) => {
    return {
      step: state.activeStep,
    };
  });
  const StepComponent = stepComponents[step as keyof typeof stepComponents];

  return (
    <div>
      <h2>Wizard Body - Current Step: {step}</h2>
      {StepComponent ? <StepComponent /> : <div>Step not found: {step}</div>}
    </div>
  );
};

export { WizardBody };
