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
      onNext={(params) => {
        console.log("on next", params);
      }}
      onPrevious={(params) => {
        console.log("on previous", params);
      }}
      validate={(params) => {
        console.log("validate", params);
      }}
    >
      StepOne
    </Step>
  );
};
const StepTwo = () => {
  return <div>StepTwo</div>;
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

const Controls = () => {
  const { next, previous, reset, goToStep, navigate } = useWizardCommands();
  return (
    <div>
      <button
        onClick={() => {
          // previous();
          navigate({ command: "previous" });
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          // next();
          navigate({ command: "next", payload: { name: "John" } });
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
      <button
        onClick={() => {
          // goToStep("stepTwo");
          navigate({ command: "goToStep", stepName: "stepTwo" });
        }}
      >
        Go to Step Two
      </button>
    </div>
  );
};

const SomeComponent = () => {
  const client = useWizardClient("wizard-1");
  useEffect(() => {
    if (!client) return;
    const unsubscribe = client.addEventListener("onStepChange", (data: any) => {
      console.log("on step change", data);
    });
    // return () => {
    //   // unsubscribe();
    // };
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
          steps={["stepOne", "stepTwo", "stepThree"]}
          activeStep="stepOne"
          onFinish={() => {
            console.log("on finish");
          }}
          onReset={() => {
            console.log("on reset");
          }}
        >
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
