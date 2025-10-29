import { useState } from "react";
import { getWizardClient, Step, useWizardCommands } from "../wizService";
import { Modal } from "antd";

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
        <button
          onClick={() => {
            getWizardClient("wizard-1");
          }}
        >
          log client
        </button>
      </Step>
    </>
  );
};
