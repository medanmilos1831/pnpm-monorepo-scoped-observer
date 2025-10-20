import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { ScrolliumClientContext } from "../ScrolliumClientProvider";
import { useScroll } from "../hooks/useScroll";
import type { ScrolliumProps } from "../types";

const ScrollContext = createContext<{ id: string } | undefined>(undefined);

const Scroll = ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
  const context = useContext(ScrolliumClientContext)!;
  if (!context) {
    throw new Error("ScrolliumClientContext not found");
  }
  const [created, _] = useState(() => {
    return context.createEntity(props);
  });
  useEffect(created, []);
  const client = useScroll(props.id);

  return (
    <ScrollContext.Provider
      value={{
        id: props.id,
      }}
    >
      <div
        ref={(element) => {
          console.log("element", element);
          const clientHeight = Math.ceil(element?.clientHeight || 0);
          const maxScroll = Math.ceil(
            (element?.scrollHeight || 0) - (element?.clientHeight || 0)
          );
          client?.setClientHeight(clientHeight);
          client?.setScrollHeight(maxScroll);
          client.scrollTo = element?.scrollTo;
          console.log("client", client);
        }}
        style={{
          height: "100%",
          width: "100%",
          overflow: "auto",
        }}
        onScroll={(e: React.UIEvent<HTMLDivElement>) => {
          client?.setScrollPosition((e.target as HTMLDivElement).scrollTop);
          if (props.onScroll) {
            props.onScroll({
              position: client.getScrollPosition(),
              isTop: client.getIsTop(),
              isBottom: client.getIsBottom(),
              clientHeight: client.getClientHeight(),
              scrollHeight: client.getScrollHeight(),
            });
          }
        }}
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
};

export { ScrollContext, Scroll };
