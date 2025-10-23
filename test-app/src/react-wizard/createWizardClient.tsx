import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { Store } from "./Store/Store";
import type { IWizardConfig } from "./types";

const createWizardClient = () => {
  const WizardContext = createContext<{ id: string } | undefined>(undefined);
  const store = new Store();
  return {
    Wizard: ({ children, ...props }: PropsWithChildren<IWizardConfig>) => {
      store.createEntity(props);
      const client = store.getClient(props.id);

      const [successRender, setSuccessRender] = useState(false);
      // useEffect(() => {
      //   onCreate();
      //   return () => {
      //     remove();
      //   };
      // }, []);

      // useEffect(() => {
      //   let unsubscribe = () => {};
      //   if (!onReset) return;
      //   unsubscribe = client.subscribe(WizardEvents.ON_RESET, onReset);
      //   return () => {
      //     unsubscribe();
      //   };
      // });
      // useEffect(() => {
      //   let unsubscribe = () => {};
      //   if (!onFinish) return;
      //   unsubscribe = client.subscribe(WizardEvents.ON_FINISH, () =>
      //     onFinish({
      //       reset: () => {
      //         client.reset();
      //       },
      //       render: () => {
      //         setSuccessRender(true);
      //       },
      //     })
      //   );
      //   return () => {
      //     unsubscribe();
      //   };
      // });
      // if (successRender) {
      //   return renderOnFinish
      //     ? renderOnFinish({
      //         reset: () => {
      //           setSuccessRender(false);
      //           client.reset();
      //         },
      //       })
      //     : null;
      // }
      return (
        <WizardContext.Provider value={{ id: props.id }}>
          {children}
        </WizardContext.Provider>
      );
    },
    Step: ({ children, ...props }: PropsWithChildren) => {
      const context = useContext(WizardContext)!;
      if (!context) {
        throw new Error("WizardContext not found");
      }
      const client = store.getClient(context.id);
      return <>{children}</>;
    },
  };
};

export { createWizardClient };
