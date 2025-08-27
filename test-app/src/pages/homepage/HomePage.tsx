import { useState } from "react";
import {
  useWizzard,
  WizzardHandler,
  useWatch,
} from "../../services/wizzardService";
const WizzardStatus = () => {
  const { activeStep } = useWatch("wizzardOne");
  return <span>Active: {activeStep}</span>;
};

export function HomePage() {
  const [count, setCount] = useState(1);
  const wizzard = useWizzard("wizzardOne", {
    initStep: count % 2 === 0 ? "one" : "four",
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
    onChange(step, direction) {
      // console.log("onChange", step, direction);
      console.log("count", count);
    },
  });
  return (
    <div>
      <h1>Home Page</h1>
      <WizzardStatus />
      <WizzardHandler name="wizzardOne">
        {({ Element }) => {
          console.log("Element");
          return <Element />;
        }}
      </WizzardHandler>
      <button onClick={() => wizzard.prevStep()}>Prev</button>
      <button onClick={() => wizzard.nextStep()}>Next</button>
      <button onClick={() => wizzard.goToStep("three")}>go to three</button>
      <button onClick={() => setCount(count + 1)}>count {count}</button>
    </div>
  );
}
