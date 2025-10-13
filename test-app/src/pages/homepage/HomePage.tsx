import { WizardProvider, WizardStep } from "../../wiz";

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

const HomePage = () => {
  return (
    <>
      <WizardProvider
        id="wizard"
        steps={["stepOne", "stepTwo", "stepThree"]}
        activeStep={"stepOne"}
      >
        <Inner />
      </WizardProvider>
    </>
  );
};

export { HomePage };
