import { useState } from "react";
import {
  useWizzard,
  WizzardHandler,
  useWatch,
} from "../../services/wizzardService";
const WizzardStatus = () => {
  const data = useWatch("wizzardOne", (data) => {
    console.log("data", data);
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
  console.log("useWatch", data);
  return <span>Active: {data.activeStep}</span>;
};

export function HomePage() {
  const [count, setCount] = useState(1);
  const wizzard = useWizzard("wizzardOne", {
    activeStep: count % 2 === 0 ? "one" : "four",
    infinite: true,
    steps:
      count % 2 === 0
        ? {
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
          }
        : {
            four: {
              element: () => {
                return <div>four component</div>;
              },
            },
            five: {
              element: () => {
                return <div>five component</div>;
              },
            },
            six: {
              element: () => {
                return <div>Six component</div>;
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
        {({ Element }) => {
          return <Element />;
        }}
      </WizzardHandler>
      <button onClick={() => wizzard.prevStep()}>Prev</button>
      <button onClick={() => wizzard.nextStep()}>Next</button>
      <button
        onClick={() => wizzard.goToStep(count % 2 === 0 ? "two" : "five")}
      >
        go to three
      </button>
      <button onClick={() => setCount(count + 1)}>count {count}</button>
    </div>
  );
}
