import { WizardStep } from "../wiz";

const StepTwo = () => {
  return (
    <WizardStep
      onPrevious={() => {
        console.log("onPrevious");
      }}
      onNext={() => {
        console.log("onNext");
      }}
    >
      StepTwo
    </WizardStep>
  );
};

export { StepTwo };
