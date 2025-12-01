import { createMessageBroker } from "../broker";
import { createScopedObserver, type ScopeNode } from "@med1802/scoped-observer";
import { Button, Modal } from "antd";
import { useState, useEffect } from "react";

enum EventName {
  ON_CHANGE = "onChange",
}

// OnChange payload
type onChangePayload = {
  open: boolean;
  message?: any;
};
type useOnChangeParams = (payload: onChangePayload) => void;
type useOnChangeReturnType = (payload: useOnChangeParams) => void;
// END :: OnChange payload

type EventPayload = {
  payload: onChangePayload;
  eventName: string;
  scope: string;
};

type Channel = {
  subscribe: (
    eventName: EventName.ON_CHANGE,
    callback: (payload: EventPayload) => void
  ) => () => void;
  useToggle: () => [boolean, () => void, message: any];
  open: (payload?: { message?: any }) => void;
  close: () => void;
  useOnChange: useOnChangeReturnType;
};

const toggleObserver = <T extends { [key: string]: any }>(params: T) => {
  const scopes: ScopeNode[] = Object.keys(params).map((scope) => ({
    scope,
  }));
  const scopedObserver = createScopedObserver(scopes);

  const messageBroker = createMessageBroker(scopedObserver);
  const obj = {} as Record<keyof T, Channel>;
  Object.keys(params).forEach((key) => {
    let messageCurrent: any;
    function open(payload?: { message?: string }) {
      params[key].logger({
        open: true,
        message: payload ? payload.message : undefined,
      });
      messageCurrent = undefined;
      messageBroker.publish({
        scope: key,
        eventName: EventName.ON_CHANGE,
        payload: {
          open: true,
          message: payload ? payload.message : undefined,
        },
      });
    }
    function close() {
      params[key].logger({ open: false, message: undefined });
      messageCurrent = undefined;
      messageBroker.publish({
        scope: key,
        eventName: EventName.ON_CHANGE,
        payload: {
          open: false,
          message: undefined,
        },
      });
    }
    function subscribe(
      eventName: EventName.ON_CHANGE,
      callback: (payload: any) => void
    ) {
      return messageBroker.subscribe({
        scope: key,
        eventName,
        callback,
      });
    }
    obj[key as keyof T] = (() => {
      return {
        open,
        close,
        subscribe,
        useToggle: () => {
          const [open, setOpen] = useState(false);
          useEffect(() => {
            const unsubscribe = messageBroker.subscribe({
              scope: key,
              eventName: EventName.ON_CHANGE,
              callback(data: EventPayload) {
                const { payload } = data;
                const { open, message } = payload;
                messageCurrent = message;
                setOpen(open);
              },
            });
            return () => unsubscribe();
          }, []);
          return [open, close, messageCurrent];
        },
        useOnChange: (callback) => {
          const unsubscribe = messageBroker.interceptor({
            scope: key,
            eventName: EventName.ON_CHANGE,
            onPublish: (obj) => {
              return {
                eventName: obj.eventName,
                payload: callback(obj.payload),
              };
            },
          });
          useEffect(() => {
            return () => unsubscribe();
          }, []);
        },
      };
    })();
  });
  return obj;
};

const toggleObservers = toggleObserver({
  modal: {
    logger: (params: any) => {
      console.log("MODAL", params);
    },
  },
  drawer: {
    logger: (params: any) => {
      console.log("DRAWER", params);
    },
  },
});
const { modal } = toggleObservers;
const { useToggle, useOnChange } = modal;

const ModalComponent = () => {
  const [value, close, message] = useToggle();
  console.log("MESSAGE", message);
  return (
    <>
      <Modal open={value} onCancel={close}>
        <div>Modal Content {message}</div>
      </Modal>
    </>
  );
};

const SomeComponent = () => {
  const [counter, setCounter] = useState(0);
  useOnChange((payload) => {
    return {
      ...payload,
      message: counter,
    };
  });
  return (
    <div>
      <h1>SomeComponent</h1>
      <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
      <p>Counter: {counter}</p>
    </div>
  );
};

const ButtonComponent = () => {
  return (
    <Button
      onClick={() => {
        toggleObservers.modal.open({ message: "kita" });
      }}
    >
      Open Modal
    </Button>
  );
};

const HomePage = () => {
  return (
    <div>
      <SomeComponent />
      <h1>HomePage</h1>
      <ModalComponent />
      <ButtonComponent />
    </div>
  );
};

export { HomePage };
