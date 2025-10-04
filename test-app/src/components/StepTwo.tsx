import { Wizzard } from "../wizard";

const StepTwo = () => {
  return (
    <Wizzard.Step
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
    </Wizzard.Step>
  );
};

export { StepTwo };
