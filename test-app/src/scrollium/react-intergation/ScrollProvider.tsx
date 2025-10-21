import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import { ScrolliumClientContext } from "./ScrolliumClientProvider";
import { useScroll } from "./hooks/useScroll";
import { ScrolliumAxis, type ScrolliumProps } from "../types";
import { getScrolliumData } from "../utils";

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
  const elementRef = useRef<HTMLDivElement>(null);
  const client = useScroll(props.id);

  useEffect(() => {
    client?.initializeElement(elementRef.current as HTMLElement);
  }, []);
  useEffect(() => {
    client!.setAxis(props.axis as ScrolliumAxis);
  }, [props.axis]);
  return (
    <ScrollContext.Provider
      value={{
        id: props.id,
      }}
    >
      <div
        ref={elementRef}
        style={{
          height: "100%",
          width: "100%",
          overflow:
            props.axis === ScrolliumAxis.HORIZONTAL
              ? "auto hidden"
              : "hidden auto",
        }}
        onScroll={(e) => {
          client?.setScrollPosition(
            client.getAxis() === ScrolliumAxis.VERTICAL
              ? (e.target as HTMLDivElement).scrollTop
              : (e.target as HTMLDivElement).scrollLeft
          );
          if (props.onScroll) {
            props.onScroll(getScrolliumData(client!));
          }
        }}
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
};

export { ScrollContext, Scroll };
