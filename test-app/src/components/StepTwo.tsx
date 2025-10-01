import { WizzardProvider } from "../wizard";

const StepTwo = () => {
  return (
    <WizzardProvider.Step
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
    </WizzardProvider.Step>
  );
};

export { StepTwo };
