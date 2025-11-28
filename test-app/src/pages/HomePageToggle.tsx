import { Drawer, Modal } from "antd";
import { createToggleClient } from "../toggle";
import { useSyncExternalStore } from "use-sync-external-store";
import { useEffect } from "react";

const { useToggle, getToggleCommands, useToggleSelector } =
  createToggleClient();

const ModalComponent = (props: { id: string; initState: "on" | "off" }) => {
  const toggle = useToggle(props);

  const { onClose } = getToggleCommands(props.id);
  return (
    <>
      <Modal open={toggle === "on"} onCancel={onClose}>
        <div style={{ padding: "20px" }}>
          <h1>Modal</h1>
          <p>{props.id === "userModal" ? "User Modal" : "Auth Modal"}</p>
        </div>
      </Modal>
    </>
  );
};

const DrawerComponent = (props: { id: string; initState: "on" | "off" }) => {
  const toggle = useToggle(props);

  const { onClose } = getToggleCommands(props.id);
  return (
    <>
      <Drawer open={toggle === "on"} onClose={onClose}>
        <div style={{ padding: "20px" }}>
          <h1>Drawer</h1>
          <p>{props.id === "userDrawer" ? "User Drawer" : "Auth Drawer"}</p>
        </div>
      </Drawer>
    </>
  );
};

const SomeComponent = () => {
  const { onOpen: onOpenUserModal } = getToggleCommands("userModal");
  const { onOpen: onOpenAuthModal } = getToggleCommands("authModal");
  const { onOpen: onOpenUserDrawer } = getToggleCommands("userDrawer");
  const { onOpen: onOpenAuthDrawer } = getToggleCommands("authDrawer");
  return (
    <div>
      <button onClick={onOpenUserModal}>Open User Modal</button>
      <button onClick={onOpenAuthModal}>Open Auth Modal</button>
      <br />
      <button onClick={onOpenUserDrawer}>Open User Drawer</button>
      <button onClick={onOpenAuthDrawer}>Open Auth Drawer</button>
    </div>
  );
};

const SomeHeader = () => {
  const usermodal = useToggleSelector("userModal");
  console.log("usermodal", usermodal);
  useEffect(() => {
    if (!usermodal) return;
    const unsubscribe = usermodal.onChange((payload) => {
      console.log("usermodal changed", payload);
    });
    return () => {
      if (!usermodal) return;
      unsubscribe();
    };
  });
  return <div style={{ padding: "20px", backgroundColor: "lightgray" }}></div>;
};

const HomePageToggle = () => {
  return (
    <div>
      <SomeHeader />
      <ModalComponent id="userModal" initState="off" />
      <ModalComponent id="authModal" initState="off" />
      <DrawerComponent id="userDrawer" initState="off" />
      <DrawerComponent id="authDrawer" initState="off" />
      <SomeComponent />
    </div>
  );
};

export { HomePageToggle };
