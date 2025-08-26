import { createElement, PropsWithChildren, useEffect, useState } from 'react';
import { Fallback, Scroll } from './Scroll';
import { ScrollInstance } from './ScrollInstance';
import { configDefaultType, configType, SCROLL_EVENTS } from './types';
import { defaultConfig } from './ScrollService';

export const createScroll = (config?: configType) => {
  let activeScrolls = new Map<string, ScrollInstance>();
  const globalConfig: configDefaultType = {
    ...defaultConfig,
    ...(config ?? {}),
  };

  return {
    ScrollElement: ({
      name,
      children,
    }: PropsWithChildren<{ name: string }>) => {
      let scrollInstance = activeScrolls.get(name);
      if (!scrollInstance) {
        return createElement(Fallback, null);
      }
      return createElement(Scroll, { scrollInstance }, children);
    },

    useScroll(name: string, config?: configType) {
      const [instance] = useState(() => {
        let obj = new ScrollInstance(name, {
          ...globalConfig,
          ...(config ?? {}),
        });
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
      // END :: RENDER

      useEffect(() => {
        return () => {
          activeScrolls.delete(name);
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
        throw new Error(`[ScrollService] Scroll instance with name "${name}" was not found. 
Make sure you wrapped your content with <ScrollElement name="${name}"> 
and that you are using the same name in useScroll / useWatch.`);
      }

      const { useSubscribe } = slice.store;
      const state = useSubscribe((state) => {
        return cb(state);
      }, events);
      return state;
    },
  };
};
