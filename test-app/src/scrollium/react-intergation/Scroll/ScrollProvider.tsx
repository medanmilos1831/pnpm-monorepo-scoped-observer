import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { ScrolliumClientContext } from "../ScrolliumClientProvider";

const ScrollContext = createContext<{ id: string } | undefined>(undefined);

const Scroll = ({ children, ...props }: PropsWithChildren<{ id: string }>) => {
  const context = useContext(ScrolliumClientContext)!;
  if (!context) {
    throw new Error("WizardClientContext not found");
  }
  const [created, _] = useState(() => {
    return context.createEntity(props);
  });
  const store = useContext(ScrolliumClientContext)!;
  useEffect(created, []);
  return (
    <ScrollContext.Provider
      value={{
        id: props.id,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export { ScrollContext, Scroll };
