import { createContext, useContext } from "react";
import type { createScrolliumClient } from "../createScrolliumClient";

const ScrolliumClientContext = createContext<
  ReturnType<typeof createScrolliumClient> | undefined
>(undefined);

const ScrolliumClientProvider = ({
  children,
  client,
}: {
  children: React.ReactNode;
  client: ReturnType<typeof createScrolliumClient>;
}) => {
  return (
    <ScrolliumClientContext.Provider value={client}>
      {children}
    </ScrolliumClientContext.Provider>
  );
};

export { ScrolliumClientProvider, ScrolliumClientContext };
