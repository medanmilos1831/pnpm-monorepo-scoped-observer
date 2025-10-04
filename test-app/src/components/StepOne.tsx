import { Modal } from "antd";
import { useState } from "react";
import { useOnStatusChange, useWizzard, Wizzard } from "../wizard";
import { Controls } from "./Controls";
import { Navigation } from "./Navigation";
import { WizardBodyNew } from "./WizardBodyNew";

const InnerPage = () => {
  const status = useOnStatusChange();
  const { reset } = useWizzard();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {status === "success" ? (
        <>
          <button onClick={() => reset()}>Reset</button>
        </>
      ) : (
        <>
          <Navigation />
          <WizardBodyNew />
          <Controls />
          {/* <Navigation />
          <WizardBody />
          <Controls /> */}
        </>
      )}
    </div>
  );
};

const StepOne = () => {
  const [open, setOpen] = useState(false);
  const { next } = useWizzard();

  return (
    <>
      <Wizzard.Step
        onNext={(params) => {
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
        {/* <SomeComponent /> */}
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
      </Wizzard.Step>
    </>
  );
};

export { StepOne };
