import { useContext } from "react";
import { Context } from "./WizzardProvider";

const useNavigate = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  return {
    nextStep: context.nextStep,
    prevStep: context.prevStep,
  };
};

export { useNavigate };
