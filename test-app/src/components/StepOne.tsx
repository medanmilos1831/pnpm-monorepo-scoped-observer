import { useMutateStepState, WizzardProvider } from "../wizard";

const StepOne = () => {
  const mutateStepState = useMutateStepState();
  const pera = () => {
    console.log("pera");
  };
  return (
    <WizzardProvider.Step
      onNext={() => {
        // Handle next step
      }}
      // stepValidate={(params) => {
      //   // Handle step validation
      // }}
      onMutateStepState={({ completed, uncompleted }) => {
        // Handle step state mutation
      }}
      onEnter={() => {
        console.log("onEnter");
      }}
    >
      <>
        step one
        {pera()}
        <button
          onClick={() => {
            mutateStepState((state) => {
              return { ...state, name: "John Doe" };
            });
          }}
        >
          Mutate Step State
        </button>
      </>
    </WizzardProvider.Step>
  );
};

export { StepOne };
