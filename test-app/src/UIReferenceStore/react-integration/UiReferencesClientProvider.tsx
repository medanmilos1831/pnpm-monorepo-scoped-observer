import { createContext, type PropsWithChildren } from "react";

const Context = createContext<any>(undefined);

const UiReferencesClientProvider = ({
  children,
  client,
}: PropsWithChildren<{ client: any }>) => {
  return <Context.Provider value={client}>{children}</Context.Provider>;
};

export { UiReferencesClientProvider, Context as UiReferencesClientContext };
