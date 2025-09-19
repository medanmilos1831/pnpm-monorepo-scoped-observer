import { Controls } from "../../components/Controls";
import { Navigation } from "../../components/Navigation";
import { WizardBody } from "../../components/WizardBody";

const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navigation />
      <WizardBody />
      <Controls />
    </div>
  );
};

export { HomePage };
