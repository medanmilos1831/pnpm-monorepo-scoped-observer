import { WizControls } from "../../components/Controls";
import { SomeComponent } from "../../components/SomeComponent";
import { StepFour } from "../../components/StepFour";
import { StepOne } from "../../components/StepOne";
import { StepThree } from "../../components/StepThree";
import { StepTwo } from "../../components/StepTwo";
import { WizNavigation } from "../../components/WizNavigation";
import { useWizard, Wizard } from "../../wizService";

const WizBody = () => {
  const StepMap: any = {
    stepOne: StepOne,
    stepTwo: StepTwo,
    stepThree: StepThree,
    stepFour: StepFour,
  };
  const { activeStep } = useWizard();
  const StepComponent = StepMap[activeStep];
  return <StepComponent />;
};
const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <SomeComponent />
      <Wizard
        id="wizard-1"
        steps={["stepOne", "stepTwo", "stepThree"]}
        activeStep="stepOne"
      >
        <WizNavigation />
        <WizBody />
        <WizControls />
      </Wizard>
    </>
  );
};

export { HomePage };
