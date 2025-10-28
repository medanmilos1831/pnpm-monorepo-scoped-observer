import { useWizard, useWizardCommands } from "../wizService";

const WizNavigation = () => {
  const wiz = useWizard();
  const { goToStep } = useWizardCommands();
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        {wiz.steps.map((step) => (
          <button
            key={step}
            onClick={() => {
              goToStep(step);
            }}
          >
            {step}
          </button>
        ))}
      </div>
    </div>
  );
};
export { WizNavigation };
