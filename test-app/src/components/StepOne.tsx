import { useState } from "react";
import { Modal } from "antd";
import { useNavigate, useStep, WizzardProvider } from "../wizard";

const StepOne = () => {
  const [open, setOpen] = useState(false);
  const { nextStep } = useNavigate();

  return (
    <>
      <WizzardProvider.Step
        onAction={(params: any) => {
          setOpen(true);
        }}
      >
        <div>Step One</div>
        <Modal
          title="Step One Modal"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => {
            setOpen(false);
            nextStep({
              type: "navigate",
            });
          }}
        >
          <p>This is a modal from Step One</p>
        </Modal>
      </WizzardProvider.Step>
    </>
  );
};

export { StepOne };
