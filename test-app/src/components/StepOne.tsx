import { useState } from "react";
import { Step, useWizardCommands } from "../wizService";
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
          console.log("STEP ONE ON NEXT");
        }}
        validate={(params) => {
          console.log("STEP ONE VALIDATE");
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
