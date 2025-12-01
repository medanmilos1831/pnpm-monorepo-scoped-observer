import { createMessageBroker } from "../broker";
import { createScopedObserver, type ScopeNode } from "@med1802/scoped-observer";
import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { createReactToggleObserver } from "../toggle/react-toogle-observer";

const toggleObservers = createReactToggleObserver({
  modal: {
    logger: (params: any) => {
      //   console.log("MODAL LOGGER", params);
    },
  },
  drawer: {
    logger: (params: any) => {
      //   console.log("DRAWER LOGGER", params);
    },
  },
});
const { modal } = toggleObservers;
const { useToggle } = modal;

const ModalComponent = () => {
  const [value, close, message] = useToggle();
  return (
    <>
      <Modal open={value} onCancel={() => close()}>
        <h1>Modal Content</h1>
      </Modal>
    </>
  );
};

const SomeComponent = () => {
  const [counter, setCounter] = useState(0);
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
