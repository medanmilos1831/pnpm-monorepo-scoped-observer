import { WizardProvider, WizardStep } from "../wizardNew/react-intergation";

const StepTwo = () => {
  return (
    <WizardProvider.Step
      onPrevious={() => {}}
      onNext={() => {}}
      middlewareOnNext={({ updateSteps }) => {
        updateSteps((prev: string[]) => {
          return [...prev, "stepThree"];
        });
      }}
    >
      StepTwo
    </WizardProvider.Step>
  );
};

export { StepTwo };
