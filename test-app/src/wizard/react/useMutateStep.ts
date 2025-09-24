import { useContext } from "react";
import { Context } from "./Provider";

export const useMutateStep = () => {
  const context = useContext(Context)!;
  return {
    mutate: (
      cb: (obj: { isCompleted: boolean; isChanged: boolean; state: any }) => {
        isCompleted: boolean;
        isChanged: boolean;
        state: any;
      }
    ) => {
      context.mutateStep(cb);
    },
  };
};
