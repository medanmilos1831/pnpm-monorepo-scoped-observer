import { useContext } from "react";
import { Context } from "./WizzardProvider";

const useMutateStepState = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  return context.mutateStepState;
};

export { useMutateStepState };
