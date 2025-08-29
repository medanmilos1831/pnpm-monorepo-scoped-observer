interface WizzardHeaderProps {
  currentStep: string;
  totalSteps: number;
  activeStep: string;
  isFirst: boolean;
  isLast: boolean;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
}

export function WizzardHeader({
  currentStep,
  totalSteps,
  activeStep,
  isFirst,
  isLast,
  onNext,
  onPrev,
  onReset,
}: WizzardHeaderProps) {
  const progress = Math.round(
    ((totalSteps - (totalSteps - (totalSteps - 1))) / totalSteps) * 100
  );

  return (
    <div className="wizzard-header">
      <div className="wizzard-info">
        <h2>Wizzard Demo</h2>
        <div className="step-indicator">
          <span className="current-step">Step {currentStep}</span>
          <span className="step-separator">of</span>
          <span className="total-steps">{totalSteps}</span>
        </div>
        <div className="active-step">
          Active: <strong>{activeStep}</strong>
        </div>
      </div>

      <div className="wizzard-navigation">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="nav-button prev-button"
        >
          ← Previous
        </button>

        <button
          onClick={onNext}
          disabled={isLast}
          className="nav-button next-button"
        >
          Next →
        </button>

        <button onClick={onReset} className="nav-button reset-button">
          Reset
        </button>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
