import React from "react";

export function StepTwo() {
  return (
    <div className="step-content">
      <h4>Step Two - Configuration</h4>
      <p>
        In this step, you can configure various wizzard settings and see how
        the system adapts.
      </p>
      <div className="config-demo">
        <label>
          <span>Theme Selection:</span>
          <select defaultValue="light">
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
            <option value="auto">Auto Theme</option>
          </select>
        </label>
        <label>
          <span>Animation Speed:</span>
          <input type="range" min="0.1" max="2" step="0.1" defaultValue="1" />
        </label>
        <label>
          <span>Notifications:</span>
          <input type="checkbox" defaultChecked />
        </label>
      </div>
      <div className="config-info">
        <p>
          <strong>Tip:</strong> These settings demonstrate how the wizzard can
          adapt to user preferences and show dynamic content based on
          configuration changes.
        </p>
      </div>
    </div>
  );
}
