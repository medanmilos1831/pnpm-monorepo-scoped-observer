import { useEffect, useState } from "react";
import {
  Wizard,
  useWizard,
  useWizardClient,
  useWizardCommands,
  Step,
} from "../../wizService";

const StepOne = () => {
  return (
    <Step
      onNext={(params) => {}}
      onPrevious={(params) => {}}
      validate={(params) => {
        params.resolve();
      }}
    >
      StepOne
    </Step>
  );
};
const StepTwo = () => {
  return (
    <div>
      <Step
        onNext={(params) => {
          params.updateSteps((steps) => [...steps, "stepThree"]);
          console.log("on next");
        }}
        onPrevious={(params) => {}}
      >
        StepTwo
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
  const { next, previous } = useWizardCommands();
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
          next({ payload: { name: "John" } });
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          // reset();
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
    client.addEventListener("onStepChange", (payload) => {
      console.log("on step change", payload);
    });
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
          onFinish={() => {
            console.log("on finish");
          }}
          onReset={() => {
            console.log("on reset");
          }}
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
