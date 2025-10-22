import { createScopedObserver } from "@scoped-observer/core";
import {
  SCROLLIUM_SCOPE,
  ScrolliumAxis,
  ScrolliumDirection,
  type ScrolliumProps,
} from "../../types";

export function stateFn(props: ScrolliumProps) {
  const observer = createScopedObserver([
    {
      scope: SCROLLIUM_SCOPE,
    },
  ]);
  return {
    observer: {
      dispatch: (eventName: string, payload?: any) => {
        observer.dispatch({
          scope: SCROLLIUM_SCOPE,
          eventName,
          payload: payload || undefined,
        });
      },
      subscribe: (eventName: string, callback: (payload: any) => void) => {
        return observer.subscribe({
          scope: SCROLLIUM_SCOPE,
          eventName,
          callback,
        });
      },
    },
    axis: props.axis as ScrolliumAxis,
    scrollPosition: 0,
    previousScrollPosition: 0,
    isScrolling: false,
    scrollTimeoutId: null as number | null,
    id: props.id,
    isStart: true,
    isEnd: false,
    clientSize: 0 as number,
    scrollSize: 0 as number,
    progress: 0 as number,
    direction: ScrolliumDirection.NONE,
    element: null as HTMLElement | null,
  };
}
