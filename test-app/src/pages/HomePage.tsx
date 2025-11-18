import { createToggleClient } from "@med1802/quantum-toggle";
import { Button, Modal } from "antd";
import { useEffect } from "react";
const {
  useVisibility,
  useVisibilityCommands,
  useModelSelector,
  getVisibilityClient,
} = createToggleClient();
const UserModal = ({ id }: { id: string }) => {
  const visibility = useVisibility({ id, initState: "off" });
  return (
    <>
      <Modal open={visibility === "on"}>modal</Modal>
    </>
  );
};
const SomeComponent = () => {
  const visibilityCommands = useVisibilityCommands("user-modal");
  return (
    <div>
      <Button onClick={() => visibilityCommands.onOpen()}>Open</Button>
    </div>
  );
};
const HomePage = () => {
  return (
    <div>
      <UserModal id="user-modal" />
      <SomeComponent />
    </div>
  );
};

export { HomePage };
