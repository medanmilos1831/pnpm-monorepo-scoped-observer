import type { PropsWithChildren } from "react";
import { createWizard } from "../createWizard";
import { Context } from "./useStep";

const Provider = ({
  children,
  value,
}: PropsWithChildren<{ value: ReturnType<typeof createWizard> }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Provider };
