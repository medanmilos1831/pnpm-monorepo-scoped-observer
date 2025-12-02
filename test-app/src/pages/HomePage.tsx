import { Button, Modal } from "antd";
import { useState } from "react";
import { createReactToggleObserver } from "../toggle/react-toogle-observer";

const toggleObservers = createReactToggleObserver({
  modal: {
    logger: (params: any) => {
      console.log("MODAL LOGGER", params);
    },
  },
  drawer: {
    logger: (params: any) => {
      console.log("DRAWER LOGGER", params);
    },
  },
});
const { modal } = toggleObservers;
const { useToggle, useInterceptor } = modal;

const ModalComponent = () => {
  const [counter, setCounter] = useState(0);
  const [value, close, message] = useToggle(counter % 2 === 0);
  console.log("MODAL VALUE", value);
  console.log("MODAL MESSAGE", message);
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

const SomeComponent = () => {
  const [counter, setCounter] = useState(0);
  useInterceptor((payload: any) => {
    return {
      ...payload,
      counter: counter + 1,
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
    <Button
      onClick={() => {
        toggleObservers.modal.open({
          name: "John Doe",
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
      <SomeComponent />
      <h1>HomePage</h1>
      <ModalComponent />
      <ButtonComponent />
    </div>
  );
};

export { HomePage };
