import { WizzardProvider } from "../wizard";

const StepFour = () => {
  return (
    <WizzardProvider.Step
    // stepValidate={(params) => {
    //   // Handle step validation
    // }}
    >
      <>step four</>
    </WizzardProvider.Step>
  );
};

export { StepFour };
