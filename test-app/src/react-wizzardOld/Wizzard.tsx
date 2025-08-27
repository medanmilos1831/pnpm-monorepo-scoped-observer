import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { WizzardContext } from "./WizzardProvider";
import { WizzardService } from "./WizzardService";

export const Wizzard = ({
  children,
  name,
  init,
  steps,
}: PropsWithChildren<{
  name: string;
  init: string;
  steps: { [key: string]: { element: (props: any) => JSX.Element } };
}>) => {
  const context = useContext(WizzardContext)!;
  useState(() => {
    const item = new WizzardService({
      name,
      init,
      steps,
    });
    context.subscribe(item.name, item);
    return context.getWizzardByName(name);
  });
  useEffect(() => {
    return () => {
      context.removeItem(name);
    };
  }, []);
  return <>{children}</>;
};
