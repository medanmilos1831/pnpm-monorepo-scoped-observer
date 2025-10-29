import { useEffect } from "react";
import { useWizardClient } from "../wizService";

export const SomeComponent = () => {
  const client = useWizardClient("wizard-1");
  console.log("CLIENT", client);
  useEffect(() => {
    client?.addEventListener("onStepChange", (payload) => {
      console.log("ON_STEP_CHANGE", payload);
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
