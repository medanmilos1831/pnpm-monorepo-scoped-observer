import { WizzardProvider } from "../wizard";

const StepThree = () => {
  return (
    <WizzardProvider.Step
      onFinish={(params) => {
        console.log("ON FINISH", params);
      }}
    >
      <>step three</>
    </WizzardProvider.Step>
  );
};

export { StepThree };
