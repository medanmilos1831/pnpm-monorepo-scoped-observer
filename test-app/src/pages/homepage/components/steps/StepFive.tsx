import React from "react";

export function StepFive() {
  return (
    <div className="step-content">
      <h4>Final Step - Summary</h4>
      <p>
        This is the last step showing a summary of what we've accomplished.
      </p>
      <div className="summary-stats">
        <div className="stat">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h5>Total Steps</h5>
            <span className="stat-value">5</span>
          </div>
        </div>
        <div className="stat">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h5>Estimated Time</h5>
            <span className="stat-value">2-3 min</span>
          </div>
        </div>
        <div className="stat">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h5>Success Rate</h5>
            <span className="stat-value">100%</span>
          </div>
        </div>
      </div>
      <div className="summary-actions">
        <h5>What's Next?</h5>
        <ul>
          <li>✅ Explore the wizzard navigation</li>
          <li>✅ Test different step configurations</li>
          <li>✅ Try the demo controls</li>
          <li>✅ Reset and start over</li>
        </ul>
      </div>
      <div className="final-message">
        <p>
          <strong>Congratulations!</strong> You've successfully completed the
          wizzard demo and experienced all the features of our powerful
          wizzard system.
        </p>
      </div>
    </div>
  );
}
