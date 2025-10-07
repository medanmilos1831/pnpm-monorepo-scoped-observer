// import { Wizzard } from "../wizard";

import { WizardStep } from "../wiz";

const StepTwo = () => {
  return (
    <WizardStep
      onPrev={(params) => {
        params.resolve();
      }}
      onFinish={(params) => {
        const resolve = params.updateSteps((steps: any) => {
          return ["stepOne", "stepTwo", "stepThree"];
        });
        resolve();
      }}
    >
      <>step two</>
    </WizardStep>
  );
};

export { StepTwo };
