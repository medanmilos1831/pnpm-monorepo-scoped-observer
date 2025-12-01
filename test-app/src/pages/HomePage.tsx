import { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import { createScopedObserver, type ScopeNode } from "@med1802/scoped-observer";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useEffect } from "react";

type EventPayload = {
  payload: { open: boolean; message?: string };
  eventName: string;
  scope: string;
};

type Channel = {
  subscribe: (
    eventName: string,
    callback: (payload: EventPayload) => void
  ) => () => void;
  useOnChange: () => [boolean, () => void];
  open: (payload: { message?: string }) => void;
  close: () => void;
};

const reactObserver = <T extends { [key: string]: any }>(params: T) => {
  const scopes: ScopeNode[] = Object.keys(params).map((scope) => ({
    scope,
  }));
  const scopedObserver = createScopedObserver(scopes);

  const messageBroker = createMessageBroker(scopedObserver);
  const obj = {} as Record<keyof T, Channel>;
  Object.keys(params).forEach((key) => {
    function open(payload: { message?: string }) {
      messageBroker.publish({
        eventName: "onChange",
        payload: {
          open: true,
          message: payload.message,
        },
      });
    }
    function close() {
      messageBroker.publish({
        eventName: "onChange",
        payload: {
          open: false,
          message: undefined,
        },
      });
    }
    obj[key as keyof T] = {
      open,
      close,
      subscribe: (eventName: string, callback: (payload: any) => void) => {
        return messageBroker.subscribe({
          eventName,
          callback,
        });
      },
      useOnChange: () => {
        const [open, setOpen] = useState(false);
        useEffect(() => {
          const unsubscribe = messageBroker.subscribe({
            eventName: "onChange",
            callback(data: EventPayload) {
              const { payload } = data;
              const { open } = payload;
              setOpen(open);
            },
          });
          return () => unsubscribe();
        }, []);
        return [open, close];
      },
    };
  });
  return obj;
};

const toggleObserver = reactObserver({
  modal: {},
  drawer: {},
});
const { modal } = toggleObserver;
const { useOnChange } = modal;

const ModalComponent = () => {
  const [value, close] = useOnChange();
  return (
    <>
      <Modal open={value} onCancel={close}>
        <div>Modal Content</div>
      </Modal>
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
        toggleObserver.modal.open({ message: "Hello, world!" });
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
