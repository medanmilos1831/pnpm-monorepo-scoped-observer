import { WizardProvider, WizardStep } from "../wizard/react-intergation";

const StepTwo = () => {
  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "2px solid #28a745",
        textAlign: "center",
      }}
    >
      <WizardProvider.Step
        onPrevious={() => {
          console.log("ON PREVIOUS");
        }}
        onNext={() => {
          console.log("ON NEXT");
        }}
        middlewareOnNext={({ updateSteps }) => {
          console.log("MIDDLEWARE ON NEXT");
        }}
        middlewareOnPrevious={({ updateSteps }) => {
          console.log("MIDDLEWARE ON PREVIOUS");
        }}
        validate={(params) => {
          console.log("VALIDATE");
          params.resolve();
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#28a745",
            marginBottom: "16px",
          }}
        >
          ⚙️ Step Two
        </div>
        <p
          style={{
            fontSize: "1rem",
            color: "#6c757d",
            margin: "0",
            lineHeight: "1.5",
          }}
        >
          Great! You're on step two. This step will dynamically add step three
          to the wizard.
        </p>
      </WizardProvider.Step>
    </div>
  );
};

export { StepTwo };
