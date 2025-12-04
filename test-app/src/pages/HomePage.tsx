import { useState } from "react";
import { createReactToggleObserver } from "../toggle/react-toogle-observer";
import { Button, Modal } from "antd";

const toggleObservers = createReactToggleObserver({
  log: false,
  middlewares: {
    someMiddleware: ({ resolve, reject }, state) => {
      resolve((value: any, message: any) => {
        return value + message;
      });
    },
  },
});

console.log(toggleObservers);

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
  const toggle = toggleObservers.getToggleClient("test");
  const toggle2 = toggleObservers.getToggleClient("test2");
  return (
    <>
      <Button onClick={() => toggle.open(1)}>Open Modal</Button>
      <Button onClick={() => toggle2.open("hello from button 2")}>
        Open Modal 2
      </Button>
    </>
  );
};

const SomeOtherComponent = () => {
  const [counter, setCounter] = useState(0);
  useMiddleware({
    toggleId: "test",
    use: "someMiddleware",
    value: counter + 1,
  });
  return (
    <>
      <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
      <p>Counter: {counter}</p>
    </>
  );
};

const HomePage = () => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <ModalComponent id="test" initialState={false} />
      <ModalComponent id="test2" initialState={false} />
      <SomeOtherComponent />
      <SomeComponent />
      <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
      {/* <p>Counter: {counter}</p> */}
    </>
  );
};

export { HomePage };
