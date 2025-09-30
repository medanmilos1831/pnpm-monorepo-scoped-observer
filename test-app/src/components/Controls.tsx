import { useNavigate } from "../wizard";

const Controls = () => {
  const { prev, next } = useNavigate();
  return (
    <div>
      <button onClick={() => prev()}>Prev</button>
      <button onClick={() => next({ force: true })}>Next</button>
    </div>
  );
};

export { Controls };
