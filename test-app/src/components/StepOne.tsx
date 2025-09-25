import { useMutateStepState, WizzardProvider } from "../wizard";

const StepOne = () => {
  const mutateStepState = useMutateStepState();
  return (
    <WizzardProvider.Step
      onNext={() => {
        // Handle next step
      }}
      // stepValidate={(params) => {
      //   // Handle step validation
      // }}
      onMutateStepState={({ completed }) => {
        // Handle step state mutation
      }}
    >
      <>
        step one
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
