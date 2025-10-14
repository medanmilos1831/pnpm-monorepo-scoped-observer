import { WizardStep } from "../wiz";

const StepTwo = () => {
  return (
    <WizardStep
      onPrevious={() => {
        console.log("onPrevious");
      }}
      // validate={(params) => {
      //   if (params.actionType === "validation") {
      //     return;
      //   }
      //   params.resolve();
      // }}
    >
      StepTwo
    </WizardStep>
  );
};

export { StepTwo };
