import { useNavigate } from "../wizard";

const Controls = () => {
  const { prev, next } = useNavigate();
  return (
    <div>
      <button onClick={() => prev()}>Prev</button>
      <button
        onClick={() =>
          next({
            actionType: "validation",
          })
        }
      >
        Next
      </button>
    </div>
  );
};

export { Controls };
