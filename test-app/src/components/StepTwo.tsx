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
      // validate={(params) => {
      //   if (params.actionType === "validation") {
      //     console.log("validate", params);
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
