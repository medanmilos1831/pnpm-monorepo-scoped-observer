import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { ScrolliumClientContext } from "./ScrolliumClientProvider";
import { useScroll } from "./hooks/useScroll";

import { throttle } from "../utils";
import { createScrollHandler } from "../utils";
import { ScrolliumAxis, type ScrolliumProps } from "../types";

const ScrollContext = createContext<{ id: string } | undefined>(undefined);

const Scroll = ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
  const context = useContext(ScrolliumClientContext)!;
  if (!context) {
    throw new Error("ScrolliumClientContext not found");
  }
  const [created, _] = useState(() => {
    return context.createEntity({
      ...props,
      axis: props.axis || ScrolliumAxis.VERTICAL,
    });
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
          const clientSize = Math.ceil(
            element![
              props.axis === ScrolliumAxis.VERTICAL
                ? "clientHeight"
                : "clientWidth"
            ] || 0
          );
          const maxScroll = Math.ceil(
            (element![
              props.axis === ScrolliumAxis.VERTICAL
                ? "scrollHeight"
                : "scrollWidth"
            ] || 0) - (clientSize || 0)
          );
          client?.setClientSize(clientSize);
          client?.setScrollSize(maxScroll);
          client!.scrollTo = (options?: ScrollToOptions) => {
            element?.scrollTo(options);
          };
        }}
        style={{
          height: "100%",
          width: "100%",
          overflow:
            props.axis === ScrolliumAxis.HORIZONTAL
              ? "auto hidden"
              : "hidden auto",
        }}
        onScroll={throttle(
          createScrollHandler(client!, props.onScroll!),
          client!.getThrottle()
        )}
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
};

export { ScrollContext, Scroll };
