import { PropsWithChildren, useRef } from 'react';
import { SCROLL_EVENTS } from './types';

export function Scroll({
  children,
  reference,
  throttleDelay = 16,
}: PropsWithChildren<{ reference: any; throttleDelay?: number }>) {
  const ref = useRef<HTMLDivElement>(null);

  const lastYRef = useRef(0);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCallRef = useRef(0);

  const handleScroll = (e: any) => {
    const el = e.target as HTMLDivElement;
    const y = el.scrollTop;
    const now = Date.now();

    if (now - lastCallRef.current >= throttleDelay) {
      lastCallRef.current = now;

      const direction =
        y > lastYRef.current ? 'down' : y < lastYRef.current ? 'up' : 'none';
      lastYRef.current = y;

      const isTop = y === 0;
      const isBottom = el.scrollHeight - y === el.clientHeight;

      reference.action({
        type: SCROLL_EVENTS.ON_SCROLL,
        payload: { y, direction, isTop, isBottom },
      });

      if (isTop) {
        reference.action({ type: SCROLL_EVENTS.ON_TOP });
      }
      if (isBottom) {
        reference.action({ type: SCROLL_EVENTS.ON_BOTTOM });
      }
    }

    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
    }
    stopTimerRef.current = setTimeout(() => {
      const direction =
        y > lastYRef.current ? 'down' : y < lastYRef.current ? 'up' : 'none';
      const isTop = y === 0;
      const isBottom = el.scrollHeight - y === el.clientHeight;

      reference.action({
        type: SCROLL_EVENTS.ON_SCROLL_STOP,
        payload: { y, direction, isTop, isBottom },
      });

      if (isTop) {
        reference.action({ type: SCROLL_EVENTS.ON_TOP });
      }
      if (isBottom) {
        reference.action({ type: SCROLL_EVENTS.ON_BOTTOM });
      }
    }, 150);
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        ref={ref}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  );
}
