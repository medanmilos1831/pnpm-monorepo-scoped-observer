import { useContext } from "react";
import { Context } from "./Wizzard";

const useWizzard = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  return {
    next: context.next,
    prev: context.prev,
    reset: context.reset,
    navigateToStep: context.navigateToStep,
  };
};

export { useWizzard };
