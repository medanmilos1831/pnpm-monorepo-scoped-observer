import { WizardStep } from "../wiz";

const StepTwo = () => {
  return (
    <WizardStep
      onPrevious={() => {}}
      onNext={() => {}}
      middlewareOnNext={({ updateSteps }) => {
        console.log("middlewareOnNext");
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
