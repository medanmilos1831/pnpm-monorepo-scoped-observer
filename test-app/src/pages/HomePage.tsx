import { Button, Drawer, Modal } from "antd";
import { useState } from "react";
import { createReactToggleObserver } from "../toggle/react-toogle-observer";

const toggleObservers = createReactToggleObserver({
  modal: {
    logger: (params) => {
      console.log("MODAL LOGGER", params);
    },
  },
  drawer: {
    logger: (params) => {
      console.log("DRAWER LOGGER", params);
    },
  },
});
const { modal, drawer } = toggleObservers;
const { useToggle: useModalToggle, useInterceptor: useModalInterceptor } =
  modal;

const { useToggle: useDrawerToggle, useInterceptor: useDrawerInterceptor } =
  drawer;

const ModalComponent = () => {
  const [counter, setCounter] = useState(0);
  const [value, close, message] = useModalToggle(false);
  return (
    <>
      <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
      <p>Counter: {counter}</p>
      <Modal
        open={value}
        onCancel={() =>
          close({
            name: "close message",
          })
        }
      >
        <h1>Modal Content</h1>
      </Modal>
    </>
  );
};

const DrawerComponent = () => {
  const [value, close, message] = useDrawerToggle(false);
  console.log("DRAWER MESSAGE", value);
  return (
    <>
      <Drawer
        open={value}
        onClose={() =>
          close({
            name: "close message",
          })
        }
      >
        <h1>Modal Content</h1>
      </Drawer>
    </>
  );
};

const SomeComponent = () => {
  const [counter, setCounter] = useState(0);
  useDrawerInterceptor((payload: any) => {
    return {
      ...payload,
      counter: counter + 1,
    };
  }, "open");
  useModalInterceptor((payload: any) => {
    return {
      ...payload,
      counter: counter + 12,
    };
  }, "open");
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
    <>
      <Button
        onClick={() => {
          toggleObservers.modal.open({
            name: "John Doe",
          });
        }}
      >
        Open Modal
      </Button>
      <Button
        onClick={() => {
          toggleObservers.drawer.open({
            name: "John Doe",
          });
        }}
      >
        Open Drawer
      </Button>
    </>
  );
};

const HomePage = () => {
  return (
    <div>
      <SomeComponent />
      <h1>HomePage</h1>
      <ModalComponent />
      <DrawerComponent />
      <ButtonComponent />
    </div>
  );
};

export { HomePage };
