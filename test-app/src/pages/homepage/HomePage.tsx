import { WizardProvider } from "../../wiz";

const HomePage = () => {
  return (
    <>
      <WizardProvider
        id="wizard"
        steps={["stepOne", "stepTwo", "stepThree"]}
        activeStep={"stepOne"}
      >
        <>nesto</>
      </WizardProvider>
    </>
  );
};

export { HomePage };
