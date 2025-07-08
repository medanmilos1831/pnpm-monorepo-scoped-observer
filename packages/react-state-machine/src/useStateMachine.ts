import { useEffect, useState } from "react";
import { IStateMachine } from "./types";

const useStateMachine = <S extends string>(machine: IStateMachine<S>) => {
  const [state, setState] = useState(() => {
    return {
      state: machine.state,
      payload: undefined,
    };
  });
  useEffect(() => {
    const unsubscribe = machine.subscribe((data) => {
      setState((prev) => {
        return {
          ...prev,
          ...data,
        };
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return state;
};

export { useStateMachine };
