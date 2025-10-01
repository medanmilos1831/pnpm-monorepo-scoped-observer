import { Controls } from "../../components/Controls";
import { Navigation } from "../../components/Navigation";
import { WizardBody } from "../../components/WizardBody";
import { useOnStatusChange, useWizzard } from "../../wizard";

const HomePage = () => {
  const status = useOnStatusChange();
  const { reset } = useWizzard();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {status === "success" ? (
        <>
          <button onClick={() => reset()}>Reset</button>
        </>
      ) : (
        <>
          <Navigation />
          <WizardBody />
          <Controls />
        </>
      )}
    </div>
  );
};

export { HomePage };
