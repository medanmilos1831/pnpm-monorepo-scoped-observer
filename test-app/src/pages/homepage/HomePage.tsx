import { useEffect, useState } from "react";
import {
  Wizard,
  useWizard,
  useWizardClient,
  useWizardCommands,
  Step,
} from "../../wizService";
import { Modal } from "antd";

const StepOne = () => {
  const { updateSteps } = useWizardCommands();
  return (
    <Step
      onNext={(params) => {}}
      onPrevious={(params) => {}}
      validate={(params) => {
        // updateSteps((steps) => {
        //   return [...steps, "stepThree"];
        // });
        params.resolve();
      }}
    >
      StepOne
    </Step>
  );
};
const StepTwo = () => {
  const { updateSteps, next } = useWizardCommands();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Modal
        open={open}
        onCancel={() => {}}
        onOk={() => {
          next({
            name: "Mark",
          });
          setOpen(false);
        }}
      >
        <span>modal</span>
      </Modal>
      <Step
        onNext={(params) => {
          updateSteps((steps) => {
            return [...steps, "stepThree"];
          });
        }}
        onPrevious={(params) => {}}
        validate={(params) => {
          if (params.payload.name === "John") {
            setOpen(true);
            return;
          }
          params.resolve();
        }}
      >
        StepTwo
        <button
          onClick={() => {
            updateSteps((steps) => {
              return [...steps, "stepThree"];
            });
          }}
        >
          Update Steps
        </button>
      </Step>
    </div>
  );
};
const StepThree = () => {
  return <div>StepThree</div>;
};

const StepsMap: any = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
};

const Body = () => {
  const { activeStep } = useWizard();

  let StepComponent = StepsMap[activeStep as keyof typeof StepsMap];
  return (
    <div>
      <StepComponent />
    </div>
  );
};

const WizNavigation = () => {
  const wiz = useWizard();
  // console.log("wiz", wiz);
  const { goToStep } = useWizardCommands();
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        {wiz.steps.map((step) => (
          <button
            key={step}
            onClick={() => {
              goToStep(step);
            }}
          >
            {step}
          </button>
        ))}
      </div>
    </div>
  );
};

const Controls = () => {
  const { next, previous, reset } = useWizardCommands();
  return (
    <div>
      <button
        onClick={() => {
          previous();
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          // next();
          next({ name: "John" });
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
    </div>
  );
};

const SomeComponent = () => {
  const client = useWizardClient("wizard-1");
  useEffect(() => {
    if (!client) return;
    client.addEventListener("onStepChange", (payload) => {});
  }, [client]);
  return (
    <div>
      <div>SomeComponent</div>
    </div>
  );
};

const Inner = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </button>
      {count % 2 === 0 ? (
        <Wizard
          id="wizard-1"
          steps={["stepOne", "stepTwo"]}
          activeStep="stepOne"
          onFinish={() => {}}
          onReset={() => {}}
        >
          <WizNavigation />
          <Body />
          <Controls />
        </Wizard>
      ) : null}
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <SomeComponent />
      <Inner />
    </>
  );
};

export { HomePage };
