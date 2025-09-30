import { Modal } from "antd";
import { useState } from "react";
import { WizzardProvider } from "../wizard";

const StepOne = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WizzardProvider.Step
        onNext={(params) => {
          params.reject({
            message: "Step One",
          });
        }}
        onPrev={(params) => {}}
        onFail={(params) => {
          console.log("params", params);
        }}
        onLeave={(params) => {
          console.log("params", params);
        }}
      >
        <div>Step One</div>
        <Modal
          title="Step One Modal"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => {
            setOpen(false);
          }}
        >
          <p>This is a modal from Step One</p>
        </Modal>
      </WizzardProvider.Step>
    </>
  );
};

export { StepOne };
