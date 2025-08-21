import { createElement, PropsWithChildren } from 'react';
import { useScroll, useWatch } from './hooks';
import { Scroll } from './Scroll';
import { itemsType, SCROLL_EVENTS, ScrollObj } from './types';

export const createScroll = () => {
  let items: itemsType = new WeakMap();

  return {
    ScrollElement: ({
      children,
      scroll,
      throttleDelay,
    }: PropsWithChildren<{ scroll: ScrollObj; throttleDelay?: number }>) => {
      let reference = items.get(scroll);
      if (!reference) {
        throw new Error('Scroll object not registered in items map');
      }
      return createElement(Scroll, { reference, throttleDelay }, children);
    },

    useScroll() {
      return useScroll(items);
    },
    useWatch<T>(
      cb: (state: any) => T,
      obj: ScrollObj,
      events: SCROLL_EVENTS[]
    ) {
      return useWatch(items, obj, cb, events);
    },
  };
};
