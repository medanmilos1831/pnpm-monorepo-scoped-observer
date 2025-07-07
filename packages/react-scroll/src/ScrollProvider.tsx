import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ScrollEntity } from './ScrollEntity';
import { IScrollObserver } from './types';

const ScrollContext = createContext<
  | {
      scroll: IScrollObserver;
      getScroll: (name: string) => ScrollEntity | undefined;
      setScroll: (name: string) => ScrollEntity | undefined;
      removeScroll: (name: string) => void;
    }
  | undefined
>(undefined);

const ScrollProvider = ({
  children,
  scroll,
}: PropsWithChildren<{ scroll: IScrollObserver }>) => {
  const [state, _] = useState(() => {
    return {
      scroll,
      getScroll(name: string) {
        return this.scroll.registry.get(name);
      },
      setScroll(name: string) {
        this.scroll.registry.set(name, new ScrollEntity());
        return this.scroll.registry.get(name);
      },
      removeScroll(name: string) {
        this.scroll.registry.delete(name);
      },
    };
  });
  useEffect(() => {
    return () => {
      scroll.clearRegisty();
    };
  }, []);
  return (
    <ScrollContext.Provider value={state}>{children}</ScrollContext.Provider>
  );
};

export { ScrollContext, ScrollProvider };
