import { Step, useWizardCommands } from "../wizService";

export const StepTwo = () => {
  const { updateSteps } = useWizardCommands();
  return (
    <Step
      onNext={(params) => {
        // Step two on next handler
      }}
      onPrevious={(params) => {
        // Step two on previous handler
      }}
    >
      <h1>StepTwo</h1>
      <button
        onClick={() => {
          updateSteps((steps) => {
            return [...steps, "stepFour"];
          });
        }}
      >
        Update Steps
      </button>
      <br />
      <br />
    </Step>
  );
};
