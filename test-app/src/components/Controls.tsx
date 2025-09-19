import React from "react";
import { useWizzardNavigate } from "../wizzard";

const Controls = () => {
  const { nextStep, prevStep } = useWizzardNavigate();
  return (
    <div>
      <button onClick={prevStep}>Prev</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export { Controls };
