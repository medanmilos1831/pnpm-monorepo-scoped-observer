import { Modal } from "antd";
import { useState } from "react";

import { useWizardCommands, WizardProvider } from "../wizard/react-intergation";

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
    <div
      style={{
        padding: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "2px solid #007bff",
        textAlign: "center",
      }}
    >
      <WizardProvider.Step
        onNext={(params) => {
          console.log("ON NEXT");
        }}
        onPrevious={(params) => {}}
        middlewareOnNext={(params) => {
          console.log("MIDDLEWARE ON NEXT");
        }}
        middlewareOnPrevious={(params) => {}}
        validate={(params) => {
          console.log("VALIDATION");
          params.resolve();
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#007bff",
            marginBottom: "16px",
          }}
        >
          🚀 Step One
        </div>
        <p
          style={{
            fontSize: "1rem",
            color: "#6c757d",
            margin: "0",
            lineHeight: "1.5",
          }}
        >
          Welcome to the first step of our wizard! This is where you can
          configure your initial settings.
        </p>
      </WizardProvider.Step>
    </div>
  );
};

export { StepOne };
