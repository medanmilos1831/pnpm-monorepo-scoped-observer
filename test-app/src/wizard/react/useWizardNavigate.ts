import { useContext } from "react";
import { Context } from "./useStep";

export const useWizardNavigate = () => {
  const context = useContext(Context)!;
  return {
    nextStep: context.value.nextStep,
    prevStep: context.value.prevStep,
  };
};
