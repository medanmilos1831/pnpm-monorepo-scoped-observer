import { WizzardProvider } from "../wizard";

const StepTwo = () => {
  const pera = () => {
    console.log("pera");
  };
  return (
    <WizzardProvider.Step
      onNext={() => {
        // Handle next step
      }}
      onEnter={() => {
        console.log("onEnter");
      }}
    >
      <>step two {pera()}</>
    </WizzardProvider.Step>
  );
};

export { StepTwo };
