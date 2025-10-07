import { Modal } from "antd";
import { useState } from "react";
import { useWizardCommands, WizardProvider } from "../wizard";

const StepOne = () => {
  const [open, setOpen] = useState(false);
  const { next } = useWizardCommands();
  return (
    <>
      <WizardProvider.Step
        onNext={(params) => {
          params.resolve();
        }}
        onPrev={() => {
          // onPrev handler
        }}
        onFail={(params) => {
          setOpen(true);
        }}
      >
        <div>Step One proba</div>

        {/* <Modal
          title="Step One Modal"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => {
            next({ actionType: "validated" });
            setOpen(false);
          }}
        >
          <p>This is a modal from Step One</p>
        </Modal> */}
      </WizardProvider.Step>
    </>
  );
};

export { StepOne };
