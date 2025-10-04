import { useInterceptor, Wizzard } from "../wizard";

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
    <Wizzard.Step
      onFinish={(params) => {
        params.success();
      }}
    >
      <>step three</>
    </Wizzard.Step>
  );
};

export { StepThree };
