import React from "react";

export function StepFour() {
  return (
    <div className="step-content">
      <h4>Bonus Step - Advanced Features</h4>
      <p>
        This step showcases advanced wizzard capabilities like direct navigation
        and state management.
      </p>
      <div className="advanced-features">
        <div className="feature-card">
          <div className="feature-header">
            <span className="feature-icon">🧭</span>
            <h5>Direct Navigation</h5>
          </div>
          <p>
            Jump to any step directly using the sidebar or programmatic
            navigation.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-header">
            <span className="feature-icon">📊</span>
            <h5>State Management</h5>
          </div>
          <p>
            Track progress, validate steps, and maintain state across the
            entire wizzard flow.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-header">
            <span className="feature-icon">⚙️</span>
            <h5>Custom Validation</h5>
          </div>
          <p>
            Add custom validation logic and conditional step progression
            based on user input.
          </p>
        </div>
      </div>
      <div className="advanced-info">
        <p>
          <strong>Developer Note:</strong> This step demonstrates how the
          wizzard system can handle complex scenarios and provide a rich
          user experience.
        </p>
      </div>
    </div>
  );
}
