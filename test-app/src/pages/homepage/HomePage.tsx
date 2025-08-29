import { useState } from "react";
import {
  useWizzard,
  WizzardHandler,
  useWatch,
} from "../../services/wizzardService";
import {
  WizzardHeader,
  WizzardContent,
  WizzardSidebar,
  WizzardStats,
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
} from "./components";
import "./HomePage.css";

export function HomePage() {
  const [count, setCount] = useState(1);

  const wizzard = useWizzard("wizzardOne", {
    activeStep: "one",
    infinite: true,
    stepsConfig: {
      one: {
        element: () => <StepOne />,
      },
      two: {
        element: () => <StepTwo />,
      },
      three: {
        element: () => <StepThree />,
      },
      four: {
        element: () => <StepFour />,
      },
      five: {
        element: () => <StepFive />,
      },
    },
  });

  // Watch wizzard state for statistics
  const wizzardStats = useWatch("wizzardOne", (data) => ({
    name: data.name,
    currentStep: data.currentStep,
    activeStep: data.activeStep,
    totalSteps: data.steps.length,
    isFirst: data.isFirst,
    isLast: data.isLast,
    infinite: data.infinite,
    steps: data.steps,
  }));

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>React Wizzard Demo</h1>
        <p>
          A powerful and flexible wizzard system built with React and TypeScript
        </p>
      </div>

      <div className="wizzard-container">
        <div className="wizzard-main">
          <WizzardHandler name="wizzardOne">
            {({ Element, ...wizzardData }) => (
              <>
                <WizzardHeader
                  currentStep={wizzardData.currentStep}
                  totalSteps={wizzardData.steps.length}
                  activeStep={wizzardData.activeStep}
                  isFirst={wizzardData.isFirst}
                  isLast={wizzardData.isLast}
                  onNext={() => wizzard.nextStep()}
                  onPrev={() => wizzard.prevStep()}
                  onReset={() => wizzard.reset()}
                />

                <WizzardContent
                  Element={Element}
                  activeStep={wizzardData.activeStep}
                  currentStep={wizzardData.currentStep}
                  isFirst={wizzardData.isFirst}
                  isLast={wizzardData.isLast}
                />
              </>
            )}
          </WizzardHandler>
        </div>

        <div className="wizzard-sidebar">
          <WizzardSidebar
            steps={wizzardStats?.steps || []}
            activeStep={wizzardStats?.activeStep || ""}
            currentStep={wizzardStats?.currentStep || ""}
            onGoToStep={(step) => wizzard.goToStep(step)}
          />

          <WizzardStats {...wizzardStats} />
        </div>
      </div>

      <div className="demo-controls">
        <h3>Demo Controls</h3>
        <div className="control-buttons">
          <button
            onClick={() => wizzard.goToStep("one")}
            className="control-btn"
          >
            Go to Step 1
          </button>
          <button
            onClick={() => wizzard.goToStep("three")}
            className="control-btn"
          >
            Go to Step 3
          </button>
          <button
            onClick={() => wizzard.goToStep("five")}
            className="control-btn"
          >
            Go to Step 5
          </button>
          <button onClick={() => setCount(count + 1)} className="control-btn">
            Count: {count}
          </button>
        </div>
      </div>
    </div>
  );
}
