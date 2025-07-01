import { useEffect, useState } from 'react';
import { DIRECTION, EVENT_MANAGER_SCROLL_OBSERVER } from '../types';
import { scrollService } from '../service/ScrollService';

const useScroll = (name: string) => {
  const [state, setState] = useState({
    scrollPosition: 0,
    clientHeight: undefined,
    direction: DIRECTION.DOWN,
    scrollProgress: 0,
    scrollTo: (position: number, behavior?: ScrollToOptions['behavior']) =>
      scrollService.scrollTo(name, position, behavior || 'smooth'),
  });
  useEffect(() => {
    const unsubscribe = scrollService.eventManager.subscribe({
      scope: EVENT_MANAGER_SCROLL_OBSERVER,
      eventName: `${name}_scrolling`,
      callback(data) {
        setState((prev) => {
          return {
            ...prev,
            ...data.payload,
          };
        });
      },
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return state;
};

export { useScroll };
