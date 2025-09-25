import { useNavigate } from "../wizard";

const Controls = () => {
  const { nextStep, prevStep } = useNavigate();
  return (
    <>
      <button onClick={nextStep}>Next</button>
      <button onClick={prevStep}>Prev</button>
    </>
  );
};

export { Controls };
