import { Step, Wizard } from "../../wizService";

const HomePage = () => {
  return (
    <Wizard
      id="wizard-1"
      steps={["step-1", "step-2", "step-3"]}
      activeStep="step-1"
    >
      <Step>
        <h1>Step 1</h1>
      </Step>
    </Wizard>
  );
};

export { HomePage };
