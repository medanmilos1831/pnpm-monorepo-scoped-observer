import { useContext } from "react";
import { Context } from "./WizzardProvider";

const useNavigate = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  return {
    nextStepIntercept: context.commands.nextStepIntercept,
    nextStepNavigate: context.commands.nextStepNavigate,
    prevStepIntercept: context.commands.prevStepIntercept,
    prevStepNavigate: context.commands.prevStepNavigate,
  };
};

export { useNavigate };
