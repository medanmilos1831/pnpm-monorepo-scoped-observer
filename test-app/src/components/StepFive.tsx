import { useStep, Wizzard } from "../wizard";

const StepFive = () => {
  const { stepName } = useStep();
  return (
    <Wizzard.Step>
      <>step five {stepName}</>
    </Wizzard.Step>
  );
};

export { StepFive };
