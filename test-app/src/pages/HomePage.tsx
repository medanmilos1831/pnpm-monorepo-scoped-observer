import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { createToggleClient } from "@med1802/quantum-toggle";

const { useToggle, useToggleCommands, useToggleSelector } =
  createToggleClient();

const UserModal = ({
  model,
}: {
  model: { id: string; initState: "on" | "off" };
}) => {
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
  console.log("visibility", visibility);

  useEffect(() => {
    const unsubscribe = visibility?.subscribers.onChange(
      (payload: "on" | "off") => {
        console.log("subscribe", payload);
      }
    );
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
      <Button onClick={() => visibilityCommands.onOpen()}>Open</Button>
    </div>
  );
};
const SomeBody = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      {count % 2 === 0 ? (
        <UserModal
          model={{
            id: "user-modal",
            initState: "off",
          }}
        />
      ) : null}
    </div>
  );
};
const HomePage = () => {
  return (
    <div>
      <div>
        <SomeHeader />
        <SomeBody />
        <SomeFooter />
      </div>
    </div>
  );
};

export { HomePage };
