import { useInterceptor, WizzardProvider } from "../wizard";

const StepThree = () => {
  useInterceptor({
    eventName: "onFinish",
    callback: (prev) => {
      return {
        ...prev,
        fname: "marko",
      };
    },
  });
  return (
    <WizzardProvider.Step
      onFinish={(params) => {
        console.log("onFinish", params);
        params.success();
      }}
    >
      <>step three</>
    </WizzardProvider.Step>
  );
};

export { StepThree };
