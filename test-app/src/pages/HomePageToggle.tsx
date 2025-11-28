import { Modal } from "antd";
import { createToggleClient } from "../toggle";

const { useToggle, useToggleSelector, getToggleCommands } =
  createToggleClient();

const ModalComponent = (props: { id: string; initState: "on" | "off" }) => {
  const toggle = useToggle(props);

  const { onClose } = getToggleCommands("modalToggle");
  return (
    <>
      <Modal open={toggle === "on"} onCancel={onClose}>
        <div>
          <p>Content</p>
        </div>
      </Modal>
    </>
  );
};

const SomeComponent = () => {
  const { onOpen } = getToggleCommands("modalToggle");
  return (
    <div>
      <button onClick={onOpen}>Open Modal</button>
    </div>
  );
};

const HomePageToggle = () => {
  return (
    <div>
      <ModalComponent id="modalToggle" initState="off" />
      <SomeComponent />
    </div>
  );
};

export { HomePageToggle };
