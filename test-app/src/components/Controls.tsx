import { useWizardNavigate } from "../wizard";

const Controls = () => {
  const { nextStep, prevStep } = useWizardNavigate();
  return (
    <div>
      <button onClick={prevStep}>Prev</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export { Controls };
