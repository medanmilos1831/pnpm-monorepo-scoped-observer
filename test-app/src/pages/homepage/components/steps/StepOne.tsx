import React from "react";

export function StepOne() {
  return (
    <div className="step-content">
      <h4>Welcome to Step One</h4>
      <p>
        This is the first step of our wizzard demo. Here you can see how
        the wizzard system works.
      </p>
      <div className="step-features">
        <div className="feature">
          <div className="feature-icon">🚀</div>
          <div className="feature-text">
            <h5>Easy Navigation</h5>
            <p>Navigate between steps with simple controls</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <div className="feature-text">
            <h5>Fast Setup</h5>
            <p>Get started quickly with minimal configuration</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icon">🎯</div>
          <div className="feature-text">
            <h5>Goal Oriented</h5>
            <p>Focus on what matters most</p>
          </div>
        </div>
      </div>
    </div>
  );
}
