import { WizzardProvider } from "../wizard";

const StepFour = () => {
  return (
    <WizzardProvider.Step
      onNext={(params) => {
        params.resolve();
        // Handle next step
      }}
      // stepValidate={(params) => {
      //   // Handle step validation
      // }}
    >
      <>step four</>
    </WizzardProvider.Step>
  );
};

export { StepFour };
