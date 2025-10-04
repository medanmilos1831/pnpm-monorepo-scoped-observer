import { useStep } from "../wizard";
import { StepFive } from "./StepFive";
import { StepSeven } from "./StepSeven";
import { StepSix } from "./StepSix";

const stepComponents: any = {
  stepFive: StepFive,
  stepSix: StepSix,
  stepSeven: StepSeven,
};

const WizardBodyNew = () => {
  const { stepName } = useStep("wizardOne") as any;
  const StepComponent = stepComponents[stepName] as any;
  return <div>{<StepComponent />}</div>;
};

export { WizardBodyNew };
