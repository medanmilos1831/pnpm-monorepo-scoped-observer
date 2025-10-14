import { Wizard, WizardStep } from "../../wiz";
import { useWizardCommands, useStep } from "../../wizard/";
import { useState } from "react";
import { Modal, Button } from "antd";

const Inner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { next, previous } = useWizardCommands();
  const step = useStep();
  console.log("step", step);
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
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          handleOk();
          next();
        }}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <WizardStep
        onNext={(params) => {
          console.log("onNext", params);
        }}
        validate={(params) => {
          console.log("validate", params);
          if (params.actionType === "validation") {
            showModal();
            return;
          }
          params.resolve();
        }}
      >
        Inner
      </WizardStep>
    </>
  );
};

const Controls = () => {
  const { next, previous } = useWizardCommands();
  return (
    <div>
      <button onClick={() => previous()}>Previous</button>
      <button
        onClick={() =>
          next({
            actionType: "validation",
          })
        }
      >
        Next
      </button>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <Wizard
        id="wizard"
        steps={["stepOne", "stepTwo", "stepThree"]}
        activeStep={"stepOne"}
      >
        <Inner />
        <Controls />
      </Wizard>
    </>
  );
};

export { HomePage };
