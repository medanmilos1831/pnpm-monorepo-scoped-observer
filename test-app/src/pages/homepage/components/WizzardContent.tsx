import React from "react";

interface WizzardContentProps {
  Element: React.ComponentType;
  currentStep: string;
  isFirst: boolean;
  isLast: boolean;
}

export function WizzardContent({
  Element,
  currentStep,
  isFirst,
  isLast,
}: WizzardContentProps) {
  return (
    <div className="wizzard-content">
      <div className="content-card">
        <div className="card-header">
          <h3>Step Content</h3>
          <div className="step-badge">{currentStep}</div>
        </div>

        <div className="card-body">
          <Element />
        </div>

        <div className="card-footer">
          <div className="step-status">
            {isFirst && <span className="status-badge first">First Step</span>}
            {isLast && <span className="status-badge last">Last Step</span>}
            {!isFirst && !isLast && (
              <span className="status-badge middle">Middle Step</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
