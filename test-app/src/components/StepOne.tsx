import { Modal } from "antd";
import { useState } from "react";
import { WizardStep } from "../wiz";
import { useWizardCommands } from "../wizard";

const StepOne = () => {
  const [open, setOpen] = useState(false);
  const { next } = useWizardCommands();
  return (
    <>
      <WizardStep
        onNext={(params) => {
          params.resolve();
          // if (params.actionMeta.actionType === "validated") {
          //   params.resolve();
          // } else {
          //   params.reject({ message: "StepOne" });
          // }
        }}
        // onPrev={(params) => {
        //   params.resolve();
        // }}
        // onFail={(params) => {
        //   setOpen(true);
        // }}
      >
        <div>Step One proba</div>

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
      </WizardStep>
    </>
  );
};

export { StepOne };
