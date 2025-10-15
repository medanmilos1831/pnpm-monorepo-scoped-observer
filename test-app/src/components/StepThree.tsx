import { WizardProvider, WizardStep } from "../wizard/react-intergation";

const StepThree = () => {
  return (
    <div style={{
      padding: "24px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      border: "2px solid #ffc107",
      textAlign: "center"
    }}>
      <WizardProvider.Step>
        <div style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#ffc107",
          marginBottom: "16px"
        }}>
          🎯 Step Three
        </div>
        <p style={{
          fontSize: "1rem",
          color: "#6c757d",
          margin: "0",
          lineHeight: "1.5"
        }}>
          Congratulations! You've reached the final step. This step was added dynamically by step two.
        </p>
      </WizardProvider.Step>
    </div>
  );
};

export { StepThree };
