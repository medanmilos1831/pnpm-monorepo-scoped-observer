import { Button, Modal } from "antd";
import { useEffect } from "react";
import { createToggleClient } from "@med1802/quantum-toggle";

const { useToggle, useToggleCommands, useToggleSelector } =
  createToggleClient();

const UserModal = ({ model }: { model: any }) => {
  const visibility = useToggle(model);
  const { onClose } = useToggleCommands(model.id);

  return (
    <Modal open={visibility === "on"} onCancel={onClose} onOk={onClose}>
      <h1>User Modal</h1>
    </Modal>
  );
};
const SomeHeader = () => {
  const visibility = useToggleSelector("user-modal");

  useEffect(() => {
    const unsubscribe = visibility?.subscribers.onChange((payload) => {
      console.log("subscribe", visibility?.getVisibility(), payload);
    });
    return () => unsubscribe?.();
  }, [visibility]);

  return (
    <div>
      <h2>Header</h2>
      <Button onClick={() => visibility?.commands.onOpen()}>
        Open form header
      </Button>
    </div>
  );
};

const SomeFooter = () => {
  const visibilityCommands = useToggleCommands("user-modal");
  return (
    <div>
      <h2>Footer</h2>
      <Button onClick={() => visibilityCommands.onOpen()}>Open</Button>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <SomeHeader />
      <UserModal
        model={{
          id: "user-modal",
          initState: "off",
        }}
      />
      <SomeFooter />
    </div>
  );
};

export { HomePage };
