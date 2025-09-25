import { useNavigate } from "../wizard";

const Controls = () => {
  const { nextStep, prevStep } = useNavigate();
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <button onClick={prevStep}>Prev</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export { Controls };
