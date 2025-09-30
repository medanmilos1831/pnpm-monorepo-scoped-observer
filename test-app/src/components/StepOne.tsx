import { Modal } from "antd";
import { useState } from "react";
import { useNavigate, WizzardProvider } from "../wizard";

const StepOne = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WizzardProvider.Step
        onNext={(params) => {
          params.reject({
            message: "Step One is not valid",
          });
          // return false;
        }}
        onPrev={(params) => {
          // return true;
        }}
        onFail={(params) => {
          console.log("params", params);
          // params.reject({
          //   message: "Step One is not valid",
          // });
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
