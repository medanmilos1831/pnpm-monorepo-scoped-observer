import { Modal } from "antd";
import { useState } from "react";
import { useWizzard, WizzardProvider } from "../wizard";

const StepOne = () => {
  const [open, setOpen] = useState(false);
  const { next } = useWizzard();
  return (
    <>
      <WizzardProvider.Step
        onNext={(params) => {
          if (params.actionMeta.actionType === "validation") {
            params.reject({
              message: "Step One",
            });
            return;
          }
          if (params.actionMeta?.actionType === "validated") {
            params.resolve();
            return;
          }
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
      </WizzardProvider.Step>
    </>
  );
};

export { StepOne };
