import React from "react";
import { useLogging } from "../wizzard";

const StepTwo = () => {
  const logging = useLogging();
  logging();
  return <div>StepTwo</div>;
};

export { StepTwo };
