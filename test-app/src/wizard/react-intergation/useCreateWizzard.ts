import { useContext, useEffect, useState } from "react";

import { type IWizardConfig, type IWizardStepsConfig } from "../types";
import { WizzardClientContext } from "./WizzardClientProvider";

const useCreateWizzard = ({
  name,
  config,
  steps,
}: {
  name: string;
  config: IWizardConfig;
  steps: IWizardStepsConfig;
}) => {
  const { ensureWizard } = useContext(WizzardClientContext)!;
  const [{ wizard, disconnect }, _] = useState(() =>
    ensureWizard(name, config, steps)
  );
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  return {
    wizard,
    disconnect,
  };
};

export { useCreateWizzard };
