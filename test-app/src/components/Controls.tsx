import { useNavigate } from "../wizard";
const Controls = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={navigate.prevStepIntercept}>Prev</button>
      <button onClick={navigate.nextStepIntercept}>Next</button>
      {/* <button onClick={navigate.prevStepNavigate}>Prev</button>
      <button onClick={navigate.nextStepNavigate}>Next</button> */}
    </div>
  );
};

export { Controls };
