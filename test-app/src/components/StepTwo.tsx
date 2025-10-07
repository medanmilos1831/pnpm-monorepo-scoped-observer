// import { Wizzard } from "../wizard";

import { WizardProvider } from "../wizard";

const StepTwo = () => {
  return (
    <WizardProvider.Step
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
    </WizardProvider.Step>
  );
};

export { StepTwo };
