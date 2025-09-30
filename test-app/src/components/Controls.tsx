import { useNavigate } from "../wizard";

const Controls = () => {
  const { prev, next } = useNavigate();
  return (
    <div>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </div>
  );
};

export { Controls };
