import { WizzardProvider } from "../wizard";

const StepTwo = () => {
  console.log("StepTwo");
  return (
    <WizzardProvider.Step>
      <>step two</>
    </WizzardProvider.Step>
  );
};

export { StepTwo };
