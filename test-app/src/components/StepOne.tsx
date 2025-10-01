import { Modal } from "antd";
import { useState } from "react";
import { useNavigate, WizzardProvider } from "../wizard";

const StepOne = () => {
  const [open, setOpen] = useState(false);
  const { next } = useNavigate();
  return (
    <>
      <WizzardProvider.Step
        onNext={(params) => {
          if (params.comamndDescription.actionType === "validation") {
            params.reject({
              message: "Step One",
            });
            return;
          }
          if (params.comamndDescription.actionType === "validated") {
            params.resolve();
            return;
          }
          params.resolve();
        }}
        onPrev={(params) => {
          console.log("On Prev", params);
        }}
        onFail={(params) => {
          setOpen(true);
        }}
        onLeave={(params) => {
          console.log("On Leave", params);
          // console.log("On Leave", params);
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
