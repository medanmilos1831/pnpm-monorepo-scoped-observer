import { WizzardProvider } from "../wizard";

const StepTwo = () => {
  const pera = () => {
    // Render logic
  };
  return (
    <WizzardProvider.Step
      onNext={() => {
        // Handle next step
      }}
      onEnter={() => {
        // Handle step enter
      }}
    >
      <>step two {pera()}</>
    </WizzardProvider.Step>
  );
};

export { StepTwo };
