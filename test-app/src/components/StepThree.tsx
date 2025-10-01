import { WizzardProvider } from "../wizard";

const StepThree = () => {
  return (
    <WizzardProvider.Step
      onFinish={(params) => {
        params.success();
      }}
    >
      <>step three</>
    </WizzardProvider.Step>
  );
};

export { StepThree };
