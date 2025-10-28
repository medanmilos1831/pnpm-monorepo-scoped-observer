import { useWizardCommands } from "../wizService";

const WizControls = () => {
  const { next, previous, reset } = useWizardCommands();
  return (
    <div>
      <button
        onClick={() => {
          previous();
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          next({ name: "John" });
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
    </div>
  );
};
export { WizControls };
