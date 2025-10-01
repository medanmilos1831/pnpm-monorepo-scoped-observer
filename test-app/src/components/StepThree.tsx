import { WizzardProvider } from "../wizard";

const StepThree = () => {
  return (
    <WizzardProvider.Step
      onFinish={(params) => {
        params.reset();
      }}
    >
      <>step three</>
    </WizzardProvider.Step>
  );
};

export { StepThree };
