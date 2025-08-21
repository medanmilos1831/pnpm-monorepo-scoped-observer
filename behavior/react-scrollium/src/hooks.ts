import { useEffect, useState } from 'react';
import { generateSlice } from './slice';
import { itemsType, SCROLL_EVENTS, ScrollObj, stateType } from './types';

export const useScroll = (items: itemsType) => {
  const [state] = useState(() => {
    let slice = generateSlice();

    let obj: ScrollObj = {
      getPosition: () => slice.getState().scrollPosition,
      getDirection: () => slice.getState().direction,
      isTop: () => slice.getState().isTop,
      isBottom: () => slice.getState().isBottom,
      isScrolling: () => slice.getState().isScrolling,
    };

    return {
      slice,
      obj,
    };
  });

  items.set(state.obj, state.slice);
  useEffect(() => {
    return () => {
      items.delete(state.obj);
    };
  }, []);
  return state.obj;
};

export const useWatch = <T>(
  items: itemsType,
  obj: ScrollObj,
  cb: (state: stateType) => T,
  events: SCROLL_EVENTS[]
) => {
  const slice = items.get(obj);
  if (!slice) {
    throw new Error('Scroll object not registered in items map');
  }

  const { useSubscribe } = slice;
  const state = useSubscribe(cb, events);
  return state;
};
