import { WizardStep } from "../wiz";

const StepTwo = () => {
  return (
    <WizardStep
      onPrevious={() => {}}
      onNext={() => {}}
      middleware={({ updateSteps }) => {
        updateSteps((prev: string[]) => {
          return [...prev, "stepThree"];
        });
      }}
    >
      StepTwo
    </WizardStep>
  );
};

export { StepTwo };
