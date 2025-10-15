import { useQuery } from "react-query";
import { StepFive } from "../../components/StepFive";
import { StepFour } from "../../components/StepFour";
import { StepOne } from "../../components/StepOne";
import { StepThree } from "../../components/StepThree";
import { StepTwo } from "../../components/StepTwo";

import {
  useStep,
  useWizardCommands,
  WizardProvider,
} from "../../wizardNew/react-intergation";
import { useState } from "react";

const StepMap: Record<string, React.ComponentType> = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
  stepFour: StepFour,
  stepFive: StepFive,
};

const WizardNavigation = () => {
  const step = useStep();
  const { previous, next, reset, goToStep } = useWizardCommands();
  return (
    <>
      {step.steps.map((step: any) => (
        <button key={step} onClick={() => goToStep(step)}>
          {step}
        </button>
      ))}
    </>
  );
};

const Controller = () => {
  const { next, previous, reset, goToStep } = useWizardCommands();
  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => previous()}>Previous</button>
        <button onClick={() => next()}>Next</button>
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => goToStep("stepTwo")}>Go to Step Two</button>
      </div>
    </>
  );
};

const WizardBody = () => {
  const step = useStep();
  const Step = StepMap[step.stepName as keyof typeof StepMap];
  return <Step />;
};

const Inner = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div>
        <WizardNavigation />
        <WizardBody />
      </div>
      <div>
        <Controller />
      </div>
    </div>
  );
};

const HomePage = () => {
  const [counter, setCounter] = useState(0);
  // Basic useQuery example
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/users"
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch users");
  //     }
  //     return response.json();
  //   },
  // });

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <p>Counter: {counter}</p>
      <WizardProvider
        id="wizard"
        steps={
          counter != 2
            ? ["stepOne", "stepTwo"]
            : ["stepOne", "stepTwo", "stepThree"]
        }
        activeStep="stepOne"
        onFinish={({ render }) => {
          render();
        }}
        renderOnFinish={({ reset }) => {
          return (
            <div>
              <button onClick={reset}>reset</button>
            </div>
          );
        }}
      >
        <Inner />
      </WizardProvider>
    </div>
  );
};

export { HomePage };
