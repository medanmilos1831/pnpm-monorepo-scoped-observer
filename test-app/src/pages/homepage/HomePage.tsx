import {
  useWizzard,
  WizzardHandler,
  useWatch,
} from "../../services/wizzardService";
const WizzardStatus = () => {
  const { activeStep } = useWatch("wizzardOne");
  return <span>Active: {activeStep}</span>;
};

export function HomePage() {
  const wizzard = useWizzard("wizzardOne", {
    initStep: "one",
    infinite: true,
    steps: {
      one: {
        element: () => {
          console.log("render one");
          return <div>One component</div>;
        },
      },
      two: {
        element: () => {
          console.log("render two");
          return <div>Two component</div>;
        },
      },
      three: {
        element: () => {
          console.log("render three");
          return <div>Three component</div>;
        },
      },
    },
  });
  console.log("wizzard", wizzard);
  return (
    <div>
      <h1>Home Page</h1>
      <WizzardStatus />
      <WizzardHandler name="wizzardOne">
        {({ Element }) => {
          return <Element />;
        }}
      </WizzardHandler>
      <button onClick={() => wizzard.prevStep()}>Prev</button>
      <button onClick={() => wizzard.nextStep()}>Next</button>
      <button onClick={() => wizzard.goToStep("three")}>go to three</button>
    </div>
  );
}
