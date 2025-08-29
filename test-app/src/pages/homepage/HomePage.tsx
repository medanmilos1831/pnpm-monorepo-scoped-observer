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
} from "./components";
import "./HomePage.css";

export function HomePage() {
  const [count, setCount] = useState(1);

  const wizzard = useWizzard("wizzardOne", {
    activeStep: "one",
    infinite: true,
    stepsConfig: {
      one: {
        element: () => (
          <div className="step-content">
            <h4>Welcome to Step One</h4>
            <p>
              This is the first step of our wizzard demo. Here you can see how
              the wizzard system works.
            </p>
            <div className="step-features">
              <div className="feature">
                <span className="feature-icon">🚀</span>
                <span>Easy Navigation</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span>Fast Transitions</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <span>Type Safe</span>
              </div>
            </div>
          </div>
        ),
      },
      two: {
        element: () => (
          <div className="step-content">
            <h4>Step Two - Configuration</h4>
            <p>
              In this step, you can configure various wizzard settings and see
              how the system adapts.
            </p>
            <div className="config-demo">
              <label>
                <input type="checkbox" defaultChecked /> Enable infinite mode
              </label>
              <label>
                <input type="checkbox" defaultChecked /> Show progress bar
              </label>
              <label>
                <input type="checkbox" /> Enable animations
              </label>
            </div>
          </div>
        ),
      },
      three: {
        element: () => (
          <div className="step-content">
            <h4>Step Three - Final</h4>
            <p>
              Congratulations! You've reached the final step. This demonstrates
              the complete wizzard flow.
            </p>
            <div className="completion-message">
              <div className="success-icon">✅</div>
              <h5>Wizzard Completed!</h5>
              <p>
                You can now reset and start over, or navigate to any previous
                step.
              </p>
            </div>
          </div>
        ),
      },
      four: {
        element: () => (
          <div className="step-content">
            <h4>Bonus Step - Advanced Features</h4>
            <p>
              This step showcases advanced wizzard capabilities like direct
              navigation and state management.
            </p>
            <div className="advanced-features">
              <div className="feature-card">
                <h6>Direct Navigation</h6>
                <p>Jump to any step instantly</p>
              </div>
              <div className="feature-card">
                <h6>State Persistence</h6>
                <p>Maintain state across steps</p>
              </div>
              <div className="feature-card">
                <h6>Event Handling</h6>
                <p>React to step changes</p>
              </div>
            </div>
          </div>
        ),
      },
      five: {
        element: () => (
          <div className="step-content">
            <h4>Final Step - Summary</h4>
            <p>
              This is the last step showing a summary of what we've
              accomplished.
            </p>
            <div className="summary-stats">
              <div className="stat">
                <div className="stat-number">5</div>
                <div className="stat-label">Total Steps</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Completion</div>
              </div>
              <div className="stat">
                <div className="stat-number">∞</div>
                <div className="stat-label">Infinite Mode</div>
              </div>
            </div>
          </div>
        ),
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
