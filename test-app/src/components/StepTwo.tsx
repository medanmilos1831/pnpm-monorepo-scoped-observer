import { WizardProvider, WizardStep } from "../wizard/react-intergation";

const StepTwo = () => {
  return (
    <div style={{
      padding: "24px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      border: "2px solid #28a745",
      textAlign: "center"
    }}>
      <WizardProvider.Step
        onPrevious={() => {}}
        onNext={() => {}}
        middlewareOnNext={({ updateSteps }) => {
          updateSteps((prev: string[]) => {
            return [...prev, "stepThree"];
          });
        }}
      >
        <div style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#28a745",
          marginBottom: "16px"
        }}>
          ⚙️ Step Two
        </div>
        <p style={{
          fontSize: "1rem",
          color: "#6c757d",
          margin: "0",
          lineHeight: "1.5"
        }}>
          Great! You're on step two. This step will dynamically add step three to the wizard.
        </p>
      </WizardProvider.Step>
    </div>
  );
};

export { StepTwo };
