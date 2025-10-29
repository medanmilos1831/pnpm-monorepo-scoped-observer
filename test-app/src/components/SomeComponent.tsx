import { useWizardClient } from "../wizService";

export const SomeComponent = () => {
  const client = useWizardClient("wizard-1");
  console.log("ACTIVE STEP", client);
  return <div>SomeComponent</div>;
};
