import { useState } from "react";
import {
  createWizardClient,
  useStep,
  useWizardCommands,
  useWizard,
  Wizard,
  WizardClientProvider,
} from "../../wizard";
const client = createWizardClient();
// const LeftSide = () => {
//   useReferenceSelector("some-ui-element-one");
//   return (
//     <div>
//       <h1>LeftSide</h1>
//     </div>
//   );
// };
// const RightSide = () => {
//   console.log("RENDER RIGHT SIDE");
//   return (
//     <div>
//       <h1>RightSide</h1>
//     </div>
//   );
// };

// const HomePage = () => {
//   console.log("RENDER HOME PAGE");
//   return (
//     <div>
//       <h1>HomePage</h1>
//       <div style={{ display: "flex" }}>
//         <div style={{ width: "50%" }}>
//           <LeftSide />
//         </div>
//         <div style={{ width: "50%" }}>
//           <RightSide />
//         </div>
//       </div>
//       <SomeUiElement id="some-ui-element-one" />
//     </div>
//   );
// };

const StepOne = () => {
  return <div>Step One</div>;
};
const StepTwo = () => {
  return <div>Step Two</div>;
};
const StepThree = () => {
  return <div>Step Three</div>;
};

const StepMap: any = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
};

const BodyWrapper = ({
  children,
}: {
  children: (stepName: string) => React.ReactNode;
}) => {
  const { stepName } = useStep();
  return <div>{children(stepName)}</div>;
};
const WizardControls = () => {
  const { next, previous } = useWizardCommands();

  return (
    <div>
      <button onClick={() => previous()}>Previous</button>

      <button onClick={() => next()}>Next</button>
    </div>
  );
};
const SomeComponent = () => {
  const wizard = useWizard("my-wizard");
  return <div>SomeComponent</div>;
};
const WizardWrapper = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      {counter % 2 === 0 ? (
        <Wizard
          id="my-wizard"
          steps={["stepOne", "stepTwo", "stepThree"]}
          activeStep="stepOne"
        >
          <BodyWrapper>
            {(stepName: any) => {
              const StepComponent = StepMap[stepName];
              return <StepComponent key={stepName} />;
            }}
          </BodyWrapper>
          <WizardControls />
        </Wizard>
      ) : (
        <div>Odd</div>
      )}
    </>
  );
};
const HomePage = () => {
  return (
    <WizardClientProvider client={client}>
      <SomeComponent />
      <WizardWrapper />
    </WizardClientProvider>
  );
};

export { HomePage };
