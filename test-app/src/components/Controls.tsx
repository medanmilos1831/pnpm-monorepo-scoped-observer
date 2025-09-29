import { useNavigate } from "../wizard";
const Controls = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate.prevStep({
            event: "stepIntercept",
          });
          // navigate.prevStep({
          //   type: "step",
          // })
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          // navigate.nextStep();
          navigate.nextStep({
            event: "stepIntercept",
          });
        }}
      >
        Next
      </button>
    </div>
  );
};

export { Controls };
