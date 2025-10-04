import React from "react";
import { useStep, useWizardCommands } from "../wizard";

const Navigation = () => {
  const { activeSteps, activeStep, activeStepsLength } = useStep();

  const { navigateToStep } = useWizardCommands();

  const getCurrentStepIndex = () => {
    return activeSteps.findIndex((step: string) => step === activeStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #e9ecef",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {activeSteps.map((step: string, index: number) => {
          const isActive = step === activeStep;
          const isCompleted = index < currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <React.Fragment key={step}>
              {/* Step Circle */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  onClick={() => navigateToStep(step)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: isActive
                      ? "#007bff"
                      : isCompleted
                      ? "#28a745"
                      : "#e9ecef",
                    color: isActive || isCompleted ? "white" : "#6c757d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: isActive ? "3px solid #0056b3" : "none",
                    boxShadow: isActive
                      ? "0 0 0 4px rgba(0, 123, 255, 0.25)"
                      : "none",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>

                {/* Step Label */}
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    fontWeight: isActive ? "600" : "400",
                    color: isActive
                      ? "#007bff"
                      : isCompleted
                      ? "#28a745"
                      : "#6c757d",
                    textAlign: "center",
                    maxWidth: "80px",
                    lineHeight: "1.2",
                  }}
                >
                  {step
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </div>
              </div>

              {/* Connector Line */}
              {index < activeStepsLength - 1 && (
                <div
                  style={{
                    width: "60px",
                    height: "2px",
                    backgroundColor:
                      index < currentStepIndex ? "#28a745" : "#e9ecef",
                    margin: "0 10px",
                    marginTop: "20px",
                    transition: "background-color 0.3s ease",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div
        style={{
          marginTop: "20px",
          width: "100%",
          height: "4px",
          backgroundColor: "#e9ecef",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${((currentStepIndex + 1) / activeStepsLength) * 100}%`,
            height: "100%",
            backgroundColor: "#007bff",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Step Counter */}
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontSize: "14px",
          color: "#6c757d",
        }}
      >
        Step {currentStepIndex + 1} of {activeStepsLength}
      </div>
    </div>
  );
};

export { Navigation };
