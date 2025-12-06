import { Button, Modal } from "antd";
import { createReactToggleObserver } from "../toggle/react-toogle-observer";
import { useState } from "react";

const toggleObservers = createReactToggleObserver({
  log: true,
  middlewares: {
    someMiddleware: ({ resolve, reject }, state) => {
      resolve((value, message) => {
        return value + message;
      });
    },
  },
});

const { useToggle, useMiddleware } = toggleObservers.reactHooks;
const ModalComponent = (params: { id: string; initialState: boolean }) => {
  const [isOpen, close, message] = useToggle(params);
  console.log("ModalComponent", message);
  return (
    <Modal
      open={isOpen}
      onCancel={() => close("close message")}
      onOk={() => close()}
    >
      <div>
        <h1>Modal</h1>
      </div>
    </Modal>
  );
};

const SomeComponent = () => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
      <p>Counter: {counter}</p>
    </>
  );
};

const SomeOtherComponent = () => {
  const toggle = toggleObservers.getToggleClient("test");
  return (
    <>
      <Button onClick={() => toggle.open(1)}>Open Modal</Button>
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <ModalComponent id="test" initialState={false} />
      <SomeComponent />
      <SomeOtherComponent />
    </>
  );
};

export { HomePage };
