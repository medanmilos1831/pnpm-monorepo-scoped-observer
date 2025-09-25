import { WizzardProvider } from "../wizard";

const StepFive = () => {
  return (
    <WizzardProvider.Step
      onNext={() => {
        // Handle next step
      }}
      // stepValidate={(params) => {
      //   // Handle step validation
      // }}
    >
      <>step five</>
    </WizzardProvider.Step>
  );
};

export { StepFive };
