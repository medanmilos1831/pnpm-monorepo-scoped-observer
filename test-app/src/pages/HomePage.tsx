import { useState } from "react";
import { createReactToggleObserver } from "../toggle/react-toogle-observer";
import { Button, Modal } from "antd";

const toggleObservers = createReactToggleObserver({
  logOnCreate: true,
});

const { useToggle, useInterceptor } = toggleObservers.reactHooks;
const ModalComponent = (params: { id: string; initialState: boolean }) => {
  const [isOpen, close, message] = useToggle(params);
  return (
    <Modal open={isOpen} onCancel={() => close()} onOk={() => close()}>
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
      <Button
        onClick={() =>
          toggle.open({
            message: "Hello from button!",
          })
        }
      >
        Open Modal
      </Button>
      <Button
        onClick={() =>
          toggle2.open({
            message: "Hello from button 2!",
          })
        }
      >
        Open Modal 2
      </Button>
    </>
  );
};

const SomeOtherComponent = () => {
  const [counter, setCounter] = useState(0);
  useInterceptor({
    id: "test",
    callback: (payload) => {
      return {
        ...payload,
        counter,
      };
    },
    action: "open",
  });
  return (
    <>
      <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
      <p>Counter: {counter}</p>
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <ModalComponent id="test" initialState={false} />
      <ModalComponent id="test2" initialState={false} />
      <SomeOtherComponent />
      <SomeComponent />
    </>
  );
};

export { HomePage };
