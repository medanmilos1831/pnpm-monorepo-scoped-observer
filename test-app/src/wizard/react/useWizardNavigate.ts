import { useContext } from "react";
import { Context } from "./Provider";

export const useWizardNavigate = () => {
  const context = useContext(Context)!;
  return {
    nextStep: context.nextStep,
    prevStep: context.prevStep,
  };
};
