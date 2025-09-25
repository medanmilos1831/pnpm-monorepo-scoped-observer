import { useMutateStepState, WizzardProvider } from "../wizard";

const StepOne = () => {
  const mutateStepState = useMutateStepState();
  const pera = () => {
    // Render logic
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
        completed();
      }}
      onEnter={() => {
        // Handle step enter
      }}
      onLeave={() => {
        // Handle step leave
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
