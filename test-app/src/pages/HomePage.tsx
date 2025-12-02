import { createReactToggleObserver } from "../toggle/react-toogle-observer";
import { Button, Modal } from "antd";

const toggleObservers = createReactToggleObserver({
  onCreate(params: { id: string; initialState: boolean }) {
    return params;
  },
});

const { useToggle } = toggleObservers.reactHooks;
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
  return (
    <Button
      onClick={() =>
        toggle.open({
          message: "Hello from button!",
        })
      }
    >
      Open Modal
    </Button>
  );
};

const HomePage = () => {
  return (
    <>
      <ModalComponent id="test" initialState={false} />
      <SomeComponent />
    </>
  );
};

export { HomePage };
