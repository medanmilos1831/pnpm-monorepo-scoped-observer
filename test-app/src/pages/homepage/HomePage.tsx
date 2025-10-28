import { useState } from "react";
import { WizControls } from "../../components/Controls";
import { StepOne } from "../../components/StepOne";
import { StepThree } from "../../components/StepThree";
import { StepTwo } from "../../components/StepTwo";
import { WizNavigation } from "../../components/WizNavigation";
import { Wizard, useWizard } from "../../wizService";

const StepsMap: any = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
};

const Body = () => {
  const { activeStep } = useWizard();

  let Step = StepsMap[activeStep as keyof typeof StepsMap];
  return (
    <div>
      <Step />
    </div>
  );
};

const Inner = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </button>
      {count % 2 === 0 ? (
        <Wizard
          id="wizard-1"
          steps={["stepOne", "stepTwo"]}
          activeStep="stepOne"
          onFinish={() => {}}
          onReset={() => {}}
        >
          <WizNavigation />
          <Body />
          <WizControls />
        </Wizard>
      ) : null}
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <Inner />
    </>
  );
};

export { HomePage };
