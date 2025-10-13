import { WizardProvider, WizardStep } from "../../wiz";
import { useWizardCommands } from "../../wizard/react-intergation";

const Inner = () => {
  return (
    <WizardStep
      commands={{
        onNext: () => {},
        // previousStep: () => {
        //   console.log("previousStep");
        // },
      }}
    >
      Inner
    </WizardStep>
  );
};

const Controls = () => {
  const { next, previous } = useWizardCommands();
  return (
    <div>
      <button onClick={() => previous()}>Previous</button>
      <button onClick={() => next()}>Next</button>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <WizardProvider
        id="wizard"
        steps={["stepOne", "stepTwo", "stepThree"]}
        activeStep={"stepOne"}
      >
        <Inner />
        <Controls />
      </WizardProvider>
    </>
  );
};

export { HomePage };
