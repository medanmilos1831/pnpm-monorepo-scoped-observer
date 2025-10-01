import { WizzardProvider } from "../wizard";

const StepTwo = () => {
  return (
    <WizzardProvider.Step
      onPrev={(params) => {
        params.resolve();
        // params.reject({
        //   message: "Step Two",
        // });
      }}
    >
      <>step two</>
    </WizzardProvider.Step>
  );
};

export { StepTwo };
