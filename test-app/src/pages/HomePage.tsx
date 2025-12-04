import { useState } from "react";
import { createReactToggleObserver } from "../toggle/react-toogle-observer";
import { Button, Modal } from "antd";

// const someMiddleware = (store: any) => {
//   return {
//     ...store,
//     someMiddleware: someMiddleware(store),
//   };
// };
const toggleObservers = createReactToggleObserver({
  log: false,
  applyMiddleware: {
    someMiddleware: ({ resolve, reject, skip }: any) => {
      // reject();
      resolve((value: any, message: any) => {
        return {
          someComponentValue: value,
          message: message,
        };
      });
    },
  },
});

console.log(toggleObservers);

const { useToggle, useInterceptor } = toggleObservers.reactHooks;
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
      <Button onClick={() => toggle.open("Hello from button!")}>
        Open Modal
      </Button>
      <Button onClick={() => toggle2.open("hello from button 2")}>
        Open Modal 2
      </Button>
    </>
  );
};

const SomeOtherComponent = () => {
  const [counter, setCounter] = useState(0);
  useInterceptor({
    id: "test",
    middleware: "someMiddleware",
    value: counter + 1,
  });
  useInterceptor({
    id: "test",
    middleware: "someMiddleware",
    value: counter + 3,
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
