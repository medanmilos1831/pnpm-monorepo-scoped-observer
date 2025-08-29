import { useState } from "react";
import {
  useWizzard,
  WizzardHandler,
  useWatch,
} from "../../services/wizzardService";
const WizzardStatus = () => {
  const data = useWatch("wizzardOne", (data) => {
    return {
      activeStep: data.activeStep,
      currentStep: data.currentStep,
      totalSteps: data.steps.length,
      isFirst: data.isFirst,
      isLast: data.isLast,
      nextStep: data.nextStepName,
      prevStep: data.prevStepName,
    };
  });
  return <span>Active: {data.activeStep}</span>;
};

export function HomePage() {
  const [count, setCount] = useState(1);
  const wizzard = useWizzard("wizzardOne", {
    activeStep: "one",
    infinite: true,
    stepsConfig: {
      one: {
        element: () => {
          return <div>One component</div>;
        },
      },
      two: {
        element: () => {
          return <div>Two component</div>;
        },
      },
      three: {
        element: () => {
          return <div>Three component</div>;
        },
      },
    },
  });
  return (
    <div>
      <h1>Home Page</h1>
      <WizzardStatus />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <WizzardHandler name="wizzardOne">
        {({ Element, activeStep }) => {
          console.log("activeStep", activeStep);
          return <Element />;
        }}
      </WizzardHandler>
      <button onClick={() => wizzard.prevStep()}>Prev</button>
      <button onClick={() => wizzard.nextStep()}>Next</button>
      <button onClick={() => wizzard.goToStep("two")}>go to two</button>
      <button onClick={() => wizzard.goToStep("three")}>go to three</button>
      <button onClick={() => setCount(count + 1)}>count {count}</button>
    </div>
  );
}
