import { Drawer, Modal } from "antd";
import { createToggleClient } from "../toggle";
import { useSyncExternalStore } from "use-sync-external-store";
import { useEffect } from "react";

const { useCreateToggle, getToggleCommands, onChange, useToggleState } =
  createToggleClient();

const ComponentOne = () => {
  useCreateToggle({
    id: "userModal",
    initState: "off",
  });
  const value = useToggleState("userModal");
  const { onOpen, onClose, onToggle } = getToggleCommands("userModal");
  return (
    <>
      <h1>Component One</h1>
      <p>Value: {value}</p>
      <button onClick={onOpen}>Open</button>
      <button onClick={onClose}>Close</button>
      <button onClick={onToggle}>Toggle</button>
    </>
  );
};
const ComponentTwo = () => {
  const { onOpen, onClose, onToggle } = getToggleCommands("userModal");
  return (
    <>
      <button onClick={onOpen}>Open</button>
      <button onClick={onClose}>Close</button>
      <button onClick={onToggle}>Toggle</button>
    </>
  );
};

const ComponentThree = () => {
  onChange("userModal", (payload) => {
    console.log("payload", payload);
  });
  return <></>;
};

const HomePageToggle = () => {
  // const userModal = useToggleState("userModal");
  // console.log("userModal", userModal);
  return (
    <div>
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
      {/* <SomeHeader />
      <ModalComponent id="userModal" initState="off" />
      <ModalComponent id="authModal" initState="off" />
      <DrawerComponent id="userDrawer" initState="off" />
      <DrawerComponent id="authDrawer" initState="off" />
      <SomeComponent /> */}
    </div>
  );
};

export { HomePageToggle };
