import { Modal } from "antd";
import { useState } from "react";
import { useWizardCommands } from "../wizard";

const StepOne = () => {
  const [open, setOpen] = useState(false);
  const { next } = useWizardCommands();
  return (
    <>
      <></>
      {/* <Wizzard.Step
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
        <div>Step One</div>

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
      </Wizzard.Step> */}
    </>
  );
};

export { StepOne };
