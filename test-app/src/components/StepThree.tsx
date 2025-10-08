import { useInterceptor, WizardStep } from "../wizard";

const StepThree = () => {
  // useInterceptor({
  //   eventName: "onFinish",
  //   callback: (prev) => {
  //     return {
  //       ...prev,
  //       fname: "marko",
  //     };
  //   },
  // });
  return (
    <WizardStep
      onFinish={(params) => {
        params.success();
      }}
    >
      <>step three</>
    </WizardStep>
    // <Wizzard.Step
    //   onFinish={(params) => {
    //     params.success();
    //   }}
    // >
    //   <>step three</>
    // </Wizzard.Step>
  );
};

export { StepThree };
