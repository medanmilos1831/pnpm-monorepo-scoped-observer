import { useStep } from "../wizzard";

const WizardBody = () => {
  const step = useStep();
  console.log("step", step);
  return <div>WizardBody</div>;
};

export { WizardBody };
