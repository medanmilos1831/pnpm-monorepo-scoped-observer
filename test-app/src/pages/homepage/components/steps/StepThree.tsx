import React from "react";

export function StepThree() {
  return (
    <div className="step-content">
      <h4>Step Three - Final</h4>
      <p>
        Congratulations! You've reached the final step. This demonstrates the
        complete wizzard flow.
      </p>
      <div className="completion-message">
        <div className="success-icon">✅</div>
        <h5>Wizzard Completed!</h5>
        <p>
          You can now reset and start over, or navigate to any previous step.
        </p>
      </div>
      <div className="completion-stats">
        <div className="stat-item">
          <span className="stat-number">3</span>
          <span className="stat-label">Steps Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Progress</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">🎉</span>
          <span className="stat-label">Success!</span>
        </div>
      </div>
    </div>
  );
}
