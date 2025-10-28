import { Step, useWizardCommands } from "../wizService";

export const StepTwo = () => {
  const { updateSteps } = useWizardCommands();
  return (
    <Step
      onNext={(params) => {
        console.log("STEP TWO ON NEXT", params);
      }}
      onPrevious={(params) => {
        console.log("STEP TWO ON PREVIOUS", params);
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
