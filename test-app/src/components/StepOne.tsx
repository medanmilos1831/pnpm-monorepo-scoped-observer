import { useState } from "react";
import { Modal } from "antd";
import { useNavigate, useStep, WizzardProvider } from "../wizard";
import { WizardEvents } from "../wizard/types";

const StepOne = () => {
  const [open, setOpen] = useState(false);
  const { nextStepIntercept, nextStepNavigate } = useNavigate();

  return (
    <>
      <WizzardProvider.Step
        onAction={(params: any) => {
          console.log("step one action", params);
          // setOpen(true);
        }}
      >
        <div>Step One</div>
        <Modal
          title="Step One Modal"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => {
            setOpen(false);
            nextStepNavigate();
          }}
        >
          <p>This is a modal from Step One</p>
        </Modal>
      </WizzardProvider.Step>
    </>
  );
};

export { StepOne };
