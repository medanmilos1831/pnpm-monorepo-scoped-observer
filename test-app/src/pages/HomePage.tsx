import { createMessageBroker } from "../broker";
import { createScopedObserver, type ScopeNode } from "@med1802/scoped-observer";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useEffect } from "react";

enum EventName {
  ON_CHANGE = "onChange",
  ON_OPEN = "onOpen",
  ON_CLOSE = "onClose",
}

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
  useInterceptOpen: any;
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
        scope: key,
        eventName: EventName.ON_OPEN,
        payload: {
          open: true,
          message: payload.message,
        },
      });
    }
    function close() {
      messageBroker.publish({
        eventName: EventName.ON_CHANGE,
        payload: {
          open: false,
          message: undefined,
        },
      });
    }
    obj[key as keyof T] = (() => {
      messageBroker.interceptor({
        scope: key,
        eventName: EventName.ON_OPEN,
        onPublish: (obj) => {
          console.log("INNER", obj);
          return {
            eventName: EventName.ON_CHANGE,
            payload: {
              open: true,
              message: {
                ...obj.payload,
              },
            },
          };
        },
      });
      return {
        open,
        close,
        subscribe: (eventName: string, callback: (payload: any) => void) => {
          return messageBroker.subscribe({
            scope: key,
            eventName,
            callback,
          });
        },
        useOnChange: () => {
          const [open, setOpen] = useState(false);
          useEffect(() => {
            const unsubscribe = messageBroker.subscribe({
              scope: key,
              eventName: EventName.ON_CHANGE,
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
        useInterceptOpen: (callback: (payload: EventPayload) => void) => {
          messageBroker.interceptor({
            scope: key,
            eventName: EventName.ON_OPEN,
            onPublish: (obj) => {
              return {
                eventName: obj.eventName,
                payload: callback(obj.payload),
              };
            },
          });
        },
      };
    })();
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
