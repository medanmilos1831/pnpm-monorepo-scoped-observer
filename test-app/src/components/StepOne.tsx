import { Modal } from "antd";
import { useState } from "react";

import {
  useWizardCommands,
  WizardProvider,
} from "../wizardNew/react-intergation";

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
      <WizardProvider.Step
        onNext={(params) => {
          console.log("onNext", params);
        }}
      >
        StepOne
      </WizardProvider.Step>
    </div>
  );
};

export { StepOne };
