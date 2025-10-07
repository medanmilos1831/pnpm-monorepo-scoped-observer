import { useStep, WizardProvider } from "../wizard";

const StepFive = () => {
  // const { stepName } = useStep();
  return (
    <WizardProvider.Step>
      <>step five</>
    </WizardProvider.Step>
  );
};

export { StepFive };
