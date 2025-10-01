import { WizzardProvider } from "../wizard";

const StepTwo = () => {
  console.log("StepTwo");
  return (
    <WizzardProvider.Step
      onPrev={(params) => {
        console.log("On Prev CALLED", params);
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
