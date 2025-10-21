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
  const someRef = useRef<HTMLDivElement>(null);
  const client = useScroll(props.id);

  useEffect(() => {
    if (someRef.current) {
      const clientSize = Math.ceil(
        someRef.current![
          props.axis === ScrolliumAxis.VERTICAL ? "clientHeight" : "clientWidth"
        ] || 0
      );
      const maxScroll = Math.ceil(
        (someRef.current![
          props.axis === ScrolliumAxis.VERTICAL ? "scrollHeight" : "scrollWidth"
        ] || 0) - (clientSize || 0)
      );
      client?.setClientSize(clientSize);
      client?.setScrollSize(maxScroll);
      client!.scrollTo = (options?: ScrollToOptions) => {
        someRef.current?.scrollTo(options);
      };
    }
  }, [someRef.current]);
  return (
    <ScrollContext.Provider
      value={{
        id: props.id,
      }}
    >
      <div
        ref={someRef}
        // ref={(element) => {
        // const clientSize = Math.ceil(
        //   element![
        //     props.axis === ScrolliumAxis.VERTICAL
        //       ? "clientHeight"
        //       : "clientWidth"
        //   ] || 0
        // );
        // const maxScroll = Math.ceil(
        //   (element![
        //     props.axis === ScrolliumAxis.VERTICAL
        //       ? "scrollHeight"
        //       : "scrollWidth"
        //   ] || 0) - (clientSize || 0)
        // );
        // client?.setClientSize(clientSize);
        // client?.setScrollSize(maxScroll);
        // client!.scrollTo = (options?: ScrollToOptions) => {
        //   element?.scrollTo(options);
        // };
        // }}
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
