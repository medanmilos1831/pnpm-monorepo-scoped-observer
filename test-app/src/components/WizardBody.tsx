import { WizzardProvider } from "../wizard";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";

const stepComponents = {
  stepOne: StepOne,
  stepTwo: StepTwo,
};

const WizardBody = () => {
  return (
    <div>
      <WizzardProvider.Step
        onNext={() => {
          console.log("onNext");
        }}
        // stepValidate={(params) => {
        //   console.log("stepValidate", params);
        // }}
      >
        <>step one</>
      </WizzardProvider.Step>
    </div>
  );
};

export { WizardBody };
