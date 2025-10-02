import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useWizzard, WizzardProvider, useInterceptor } from "../wizard";

const SomeComponent = () => {
  useInterceptor({
    eventName: "onNext",
    callback: (prev) => {
      return {
        ...prev,
        fname: "pera",
      };
    },
  });
  return <div>Some Component</div>;
};

const SomeComponent2 = () => {
  useInterceptor({
    eventName: "reset",
    callback: (prev) => {
      return {
        ...prev,
        lname: "peric",
      };
    },
  });
  return <div>Some Component</div>;
};

const StepOne = () => {
  const [open, setOpen] = useState(false);
  const { next } = useWizzard();

  return (
    <>
      <WizzardProvider.Step
        onNext={(params) => {
          console.log("onNext", params);
          // params.reject({
          //   message: "Step One",
          // });
          // if (params.actionMeta.actionType === "validation") {
          //   params.reject({
          //     message: "Step One",
          //   });
          //   return;
          // }
          // if (params.actionMeta?.actionType === "validated") {
          //   params.resolve();
          //   return;
          // }
          params.resolve();
        }}
        onPrev={() => {
          // onPrev handler
        }}
        onFail={(params) => {
          console.log("FAILED", params);
          setOpen(true);
        }}
      >
        <div>Step One</div>
        <SomeComponent />
        <SomeComponent2 />
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
