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
      onEnter={({ completed, uncompleted }) => {}}
    >
      <>step two {pera()}</>
    </WizzardProvider.Step>
  );
};

export { StepTwo };
