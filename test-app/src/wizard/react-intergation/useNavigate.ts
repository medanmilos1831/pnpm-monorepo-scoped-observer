import { useContext } from "react";
import { Context } from "./WizzardProvider";

const useNavigate = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  return {
    next: context.next,
    prev: context.prev,
  };
};

export { useNavigate };
