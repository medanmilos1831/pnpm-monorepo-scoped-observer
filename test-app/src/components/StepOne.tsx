import { Modal } from "antd";
import { useState } from "react";
import { useStep, useWizardCommands, WizardProvider } from "../wizard";
import { Wizard } from "../wiz";
import { StepFour } from "./StepFour";
import { StepFive } from "./StepFive";
import { Controls } from "./Controls";
const stepComponents: any = {
  stepFour: StepFour,
  stepFive: StepFive,
};
const WizardBody = () => {
  const { stepName } = useStep() as any;
  const StepComponent = stepComponents[stepName] as any;
  return (
    <div>
      <StepComponent>step {stepName}</StepComponent>
    </div>
  );
};
// const Controls = () => {
//   return <div>Controls</div>;
// };
const InnerPage = () => {
  return (
    <div>
      <WizardBody />
      <Controls />
    </div>
  );
};

const StepOne = () => {
  const [open, setOpen] = useState(false);
  const { next } = useWizardCommands();
  const { stepName } = useStep("wizardTwo") as any;
  return (
    <>
      <WizardProvider.Step
        onNext={(params) => {
          if (params.actionMeta.actionType === "validated") {
            params.resolve();
          } else {
            params.reject({ message: "StepOne" });
          }
        }}
        onPrev={(params) => {
          params.resolve();
        }}
        onFail={(params) => {
          setOpen(true);
        }}
      >
        <div>Step One proba {stepName}</div>

        <Wizard
          name="wizardTwo"
          config={{
            activeStep: "stepFour",
          }}
          wizardStepsConfig={{ activeSteps: ["stepFour", "stepFive"] }}
        >
          <InnerPage />
        </Wizard>

        <Modal
          title="Step One Modal"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => {
            next({ actionType: "validated" });
            setOpen(false);
          }}
        >
          <p>This is a modal from Step One</p>
        </Modal>
      </WizardProvider.Step>
    </>
  );
};

export { StepOne };
