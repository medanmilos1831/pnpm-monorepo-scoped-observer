import React from "react";
import { useNavigation } from "../wizard";

const Navigation = () => {
  const { activeSteps } = useNavigation();
  console.log("ACTIVE STEPS", activeSteps);
  return <div></div>;
};

export { Navigation };
