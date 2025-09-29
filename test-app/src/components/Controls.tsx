import { useNavigate } from "../wizard";
const Controls = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={navigate.prevStepNavigate}>Prev</button>
      <button onClick={navigate.nextStepNavigate}>Next</button>
      {/* <button onClick={navigate.prevStepNavigate}>Prev</button>
      <button onClick={navigate.nextStepNavigate}>Next</button> */}
    </div>
  );
};

export { Controls };
