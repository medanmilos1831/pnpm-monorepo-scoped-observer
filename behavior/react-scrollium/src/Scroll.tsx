import { PropsWithChildren, useEffect } from 'react';
import { ScrollInstance } from './ScrollInstance';
import { handleScroll } from './ScrollService';

export function Scroll({
  children,
  scrollInstance,
}: PropsWithChildren<{
  scrollInstance: ScrollInstance;
}>) {
  useEffect(() => {
    scrollInstance.api.scrollTop({
      top: scrollInstance.store.getState().scrollPosition,
    });
  }, []);
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        ref={(element) => {
          scrollInstance.store.action({
            type: 'onMount',
            payload: {
              element,
              elementHeight: element?.clientHeight,
              scrollableHeight: element?.scrollHeight! - element?.clientHeight!,
              scrollHeight: element?.scrollHeight,
            },
            silent: true,
          });
        }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}
        onScroll={handleScroll(scrollInstance.store)}
      >
        {children}
      </div>
    </div>
  );
}
export function Fallback({ children }: PropsWithChildren) {
  return (
    <div className="p-4 border rounded-lg bg-gray-100 text-gray-500 text-sm">
      ⚠️ Scroll instance not found
      <div className="mt-2">{children}</div>
    </div>
  );
}
