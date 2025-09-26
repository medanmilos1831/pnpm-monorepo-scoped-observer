import { WizzardProvider } from "../wizard";

const StepThree = () => {
  return (
    <WizzardProvider.Step
      onStepChange={(params) => {
        params.resolve();
        // Handle next step
      }}
      // stepValidate={(params) => {
      //   // Handle step validation
      // }}
    >
      <>step three</>
    </WizzardProvider.Step>
  );
};

export { StepThree };
