import { Modal } from "antd";
import { useState } from "react";
import { Step, useWizardCommands } from "../wizService";

export const StepOne = () => {
  const [open, setOpen] = useState(false);
  const { next } = useWizardCommands();
  return (
    <>
      <Modal
        open={open}
        onOk={() => {
          setOpen(false);
          next({ name: "Smit" });
        }}
      >
        <span>StepOne</span>
      </Modal>
      <Step
        onNext={(params) => {
          // Step one on next handler
        }}
        validate={(params) => {
          if (params.payload?.name === "John") {
            setOpen(true);
            return;
          }
          params.resolve();
        }}
      >
        StepOne
      </Step>
    </>
  );
};
