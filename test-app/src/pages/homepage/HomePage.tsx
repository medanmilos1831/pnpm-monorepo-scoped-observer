import {
  useWizzard,
  WizzardHandler,
} from "../../services/wizzardService";
import {
  WizzardHeader,
  WizzardContent,
  WizzardSidebar,
  WizzardStats,
  DemoControls,
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
} from "./components";
import "./HomePage.css";

export function HomePage() {
  const wizzard = useWizzard("wizzardOne", {
    activeStep: "one",
    infinite: true,
    stepsConfig: {
      one: {
        element: () => <StepOne />,
      },
      two: {
        element: () => <StepTwo />,
      },
      three: {
        element: () => <StepThree />,
      },
      four: {
        element: () => <StepFour />,
      },
      five: {
        element: () => <StepFive />,
      },
    },
  });



  return (
    <div className="home-page">
      <div className="page-header">
        <h1>React Wizzard Demo</h1>
        <p>
          A powerful and flexible wizzard system built with React and TypeScript
        </p>
      </div>

      <div className="wizzard-container">
        <div className="wizzard-main">
          <WizzardHandler name="wizzardOne">
            {({ Element, ...wizzardData }) => (
              <>
                <WizzardHeader
                  currentStep={wizzardData.currentStep}
                  totalSteps={wizzardData.steps.length}
                  activeStep={wizzardData.activeStep}
                  isFirst={wizzardData.isFirst}
                  isLast={wizzardData.isLast}
                  onNext={() => wizzard.nextStep()}
                  onPrev={() => wizzard.prevStep()}
                  onReset={() => wizzard.reset()}
                />

                <WizzardContent
                  Element={Element}
                  activeStep={wizzardData.activeStep}
                  currentStep={wizzardData.currentStep}
                  isFirst={wizzardData.isFirst}
                  isLast={wizzardData.isLast}
                />
              </>
            )}
          </WizzardHandler>
        </div>

        <div className="wizzard-sidebar">
          <WizzardSidebar
            wizzardName="wizzardOne"
            onGoToStep={(step) => wizzard.goToStep(step)}
          />

          <WizzardStats wizzardName="wizzardOne" />
        </div>
      </div>

      <DemoControls wizzardName="wizzardOne" />
    </div>
  );
}
