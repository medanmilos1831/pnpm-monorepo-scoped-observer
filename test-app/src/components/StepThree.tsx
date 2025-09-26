import { WizzardProvider } from "../wizard";

const StepThree = () => {
  return (
    <WizzardProvider.Step
    // stepValidate={(params) => {
    //   // Handle step validation
    // }}
    >
      <>step three</>
    </WizzardProvider.Step>
  );
};

export { StepThree };
