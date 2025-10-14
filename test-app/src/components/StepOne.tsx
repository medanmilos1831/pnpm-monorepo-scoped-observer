import { Modal } from "antd";
import { useState } from "react";
import { WizardStep } from "../wiz";
import { useWizardCommands } from "../wizard";

const StepOne = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { next, previous } = useWizardCommands();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <WizardStep
        onNext={(params) => {
        }}
        // validate={(params) => {
        //   if (params.actionType === "validation") {
        //     showModal();
        //     return;
        //   }
        //   params.resolve();
        // }}
      >
        StepOne
      </WizardStep>
    </div>
  );
};

export { StepOne };
