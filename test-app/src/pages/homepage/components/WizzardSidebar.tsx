import React from "react";
import { useWatch } from "../../../services/wizzardService";

interface WizzardSidebarProps {
  wizzardName: string;
  onGoToStep: (step: string) => void;
}

export function WizzardSidebar({
  wizzardName,
  onGoToStep,
}: WizzardSidebarProps) {
  const wizzardData = useWatch(wizzardName, (data) => ({
    steps: data.steps,
    activeStep: data.activeStep,
    currentStep: data.currentStep,
  }));

  if (!wizzardData) {
    return (
      <div className="wizzard-sidebar">
        <div className="sidebar-header">
          <h3>Step Navigation</h3>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const { steps, activeStep, currentStep } = wizzardData;

  return (
    <div className="wizzard-sidebar">
      <div className="sidebar-header">
        <h3>Step Navigation</h3>
        <p>Click on any step to navigate directly</p>
      </div>

      <div className="step-list">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`step-item ${step === activeStep ? "active" : ""} ${
              step === currentStep ? "current" : ""
            }`}
            onClick={() => onGoToStep(step)}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-info">
              <div className="step-name">{step}</div>
              <div className="step-status">
                {step === activeStep && (
                  <span className="status active">Active</span>
                )}
                {step === currentStep && (
                  <span className="status current">Current</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="step-summary">
          <strong>Total Steps:</strong> {steps.length}
        </div>
        <div className="current-summary">
          <strong>Current:</strong> {currentStep}
        </div>
      </div>
    </div>
  );
}
