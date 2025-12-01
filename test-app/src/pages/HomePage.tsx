import { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import { createScopedObserver, type ScopeNode } from "@med1802/scoped-observer";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useEffect } from "react";

type Channel = {
  publish: (eventName: string, payload: any) => void;
  subscribe: (
    eventName: string,
    callback: (payload: any) => void
  ) => () => void;
  useSubscribe: (eventName: string, callback: (payload: any) => void) => void;
};

const reactObserver = <T extends { [key: string]: any }>(params: T) => {
  const scopes: ScopeNode[] = Object.keys(params).map((scope) => ({
    scope,
  }));
  const scopedObserver = createScopedObserver(scopes);

  const messageBroker = createMessageBroker(scopedObserver);
  const obj = {} as Record<keyof T, Channel>;
  Object.keys(params).forEach((key) => {
    obj[key as keyof T] = {
      publish: (
        eventName: string,
        payload: { data: boolean; message: string }
      ) => {
        messageBroker.publish({
          eventName,
          payload,
        });
      },
      subscribe: (eventName: string, callback: (payload: any) => void) => {
        return messageBroker.subscribe({
          eventName,
          callback,
        });
      },
      useSubscribe: (eventName: string, callback: (payload: any) => void) => {
        const [value, setValue] = useState(false);
        useEffect(() => {
          const unsubscribe = messageBroker.subscribe({
            eventName,
            callback,
          });
          return () => unsubscribe();
        }, []);
      },
    };
  });
  return obj;
};

const toggleObserver = reactObserver({
  modal: {},
  drawer: {},
});

const ModalComponent = () => {
  const [open, setOpen] = useState(false);
  //   useEffect(() => {
  //     const unsubscribe = toggleObserver.useSubscribe(
  //       "openModal",
  //       ({ payload }) => {
  //         console.log(payload);
  //         setOpen(payload.data);
  //       }
  //     );
  //     return unsubscribe;
  //   }, []);
  return (
    <>
      <Modal open={open}></Modal>
    </>
  );
};

const SomeComponent = () => {
  return (
    <div>
      <h1>SomeComponent</h1>
    </div>
  );
};

const ButtonComponent = () => {
  return (
    <Button
      onClick={() => {
        toggleObserver.modal.publish("openModal", {
          data: true,
          message: "Hello, world!",
        });
      }}
    >
      Open Modal
    </Button>
  );
};

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <ModalComponent />
      <SomeComponent />
      <ButtonComponent />
    </div>
  );
};

export { HomePage };
