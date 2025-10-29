import { useWizardClient } from "../wizService";

export const SomeComponent = () => {
  const client = useWizardClient("wizard-1");
  return <div>SomeComponent</div>;
};
