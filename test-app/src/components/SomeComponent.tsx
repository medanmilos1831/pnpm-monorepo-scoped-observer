import { useEffect } from "react";
import { useWizardSelector } from "../wizService";

export const SomeComponent = () => {
  const client = useWizardSelector("wizard-1");
  useEffect(() => {
    client?.addEventListener("onStepChange", (payload) => {
      // Step change handler
    });
  }, [client]);
  return (
    <div>
      <h1>SomeComponent</h1>
      <button
        onClick={() => {
          client?.commands.next();
        }}
      >
        Next
      </button>
    </div>
  );
};
