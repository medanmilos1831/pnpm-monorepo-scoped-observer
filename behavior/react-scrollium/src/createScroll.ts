import { createElement, PropsWithChildren, useEffect, useState } from 'react';
import { Scroll } from './Scroll';
import { ScrollInstance } from './ScrollInstance';
import { configType, SCROLL_EVENTS } from './types';

export const createScroll = () => {
  let activeScrolls = new Map<string, ScrollInstance>();

  return {
    ScrollElement: ({
      name,
      children,
    }: PropsWithChildren<{ name: string }>) => {
      let scrollInstance = activeScrolls.get(name);
      if (!scrollInstance) {
        throw new Error('Scroll object not registered in items map');
      }
      return createElement(Scroll, { scrollInstance }, children);
    },

    useScroll(name: string, config?: configType) {
      function init() {
        const instance = new ScrollInstance(name, config);
        return instance;
      }

      const [instance] = useState(() => {
        let obj = init();
        activeScrolls.set(name, obj);
        return obj;
      });

      // RENDER
      if (
        config?.scrollPosition &&
        config.scrollPosition !== instance.store.getState().scrollPosition
      ) {
        instance.store.action({
          type: 'onChange',
          payload: {
            key: 'scrollPosition',
            value: config.scrollPosition,
          },
          silent: true,
        });
      }

      if (
        config?.throttleDelay &&
        config.throttleDelay !== instance.store.getState().throttleDelay
      ) {
        instance.store.action({
          type: 'onChange',
          payload: {
            key: 'throttleDelay',
            value: config.throttleDelay,
          },
          silent: true,
        });
      }
      if (
        config?.behavior &&
        config.behavior !== instance.store.getState().behavior
      ) {
        instance.store.action({
          type: 'onChange',
          payload: {
            key: 'behavior',
            value: config.behavior,
          },
          silent: true,
        });
      }
      // END :: RENDER

      useEffect(() => {
        return () => {
          activeScrolls.delete(name);
          const timer = instance.store.getState().stopTimerRef;
          if (timer) clearTimeout(timer);
        };
      }, [name]);

      return instance.api;
    },

    useWatch<T>(
      cb: (state: ReturnType<ScrollInstance['store']['getState']>) => T,
      name: string,
      events: SCROLL_EVENTS[]
    ) {
      const slice = activeScrolls.get(name);
      if (!slice) {
        throw new Error('Scroll object not registered in items map');
      }

      const { useSubscribe } = slice.store;
      const state = useSubscribe(cb, events);
      return state;
    },
  };
};
