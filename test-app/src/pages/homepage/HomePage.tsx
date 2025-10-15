import { StepFive } from "../../components/StepFive";
import { StepFour } from "../../components/StepFour";
import { StepOne } from "../../components/StepOne";
import { StepThree } from "../../components/StepThree";
import { StepTwo } from "../../components/StepTwo";

import { useState } from "react";
import {
  useStep,
  useWizardCommands,
  WizardProvider,
} from "../../wizard/react-intergation";
import { useWizardClient } from "../../wizard";

const StepMap: Record<string, React.ComponentType> = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
  stepFour: StepFour,
  stepFive: StepFive,
};

const SomeComponent = () => {
  const client = useWizardClient();
  return <div>SomeComponent</div>;
};

const WizardNavigation = () => {
  const step = useStep();
  console.log("step", step);
  const { previous, next, reset, goToStep } = useWizardCommands();
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        marginBottom: "20px",
        padding: "16px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #e9ecef",
      }}
    >
      {step.steps.map((stepName: any) => (
        <button
          key={stepName}
          onClick={() => goToStep(stepName)}
          style={{
            padding: "8px 16px",
            backgroundColor: stepName === step.stepName ? "#007bff" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            if (stepName !== step.stepName) {
              e.currentTarget.style.backgroundColor = "#5a6268";
            }
          }}
          onMouseOut={(e) => {
            if (stepName !== step.stepName) {
              e.currentTarget.style.backgroundColor = "#6c757d";
            }
          }}
        >
          {stepName}
        </button>
      ))}
    </div>
  );
};

const Controller = () => {
  const { next, previous, reset, goToStep } = useWizardCommands();
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "16px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <button
        onClick={() => previous()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5a6268")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
      >
        ← Previous
      </button>
      <button
        onClick={() =>
          next({
            actionType: "validate",
          })
        }
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
      >
        Next →
      </button>
      <button
        onClick={() => reset()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c82333")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
      >
        Reset
      </button>
      <button
        onClick={() => goToStep("stepTwo")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Go to Step Two
      </button>
    </div>
  );
};

const WizardBody = () => {
  const step = useStep();
  const Step = StepMap[step.stepName as keyof typeof StepMap];
  return <Step />;
};

const Inner = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          border: "1px solid #e9ecef",
        }}
      >
        <WizardNavigation />
        <WizardBody />
      </div>
      <div>
        <Controller />
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            color: "#343a40",
            margin: "0",
            fontWeight: "600",
          }}
        >
          Wizard Demo
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#6c757d",
            margin: "10px 0 0 0",
          }}
        >
          Interactive step-by-step wizard with beautiful UI
        </p>
      </div>

      <WizardProvider
        id="wizard"
        steps={["stepOne", "stepTwo"]}
        activeStep="stepOne"
        onFinish={({ render }) => {
          render();
        }}
        renderOnFinish={({ reset }) => {
          return (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                backgroundColor: "#d4edda",
                borderRadius: "12px",
                border: "1px solid #c3e6cb",
                color: "#155724",
              }}
            >
              <h2 style={{ margin: "0 0 20px 0" }}>🎉 Wizard Completed!</h2>
              <button
                onClick={reset}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Start Over
              </button>
            </div>
          );
        }}
      >
        <Inner />
      </WizardProvider>
    </div>
  );
};

export { HomePage };
