import { useEffect } from "react";
import { createToggleClient } from "../toggle";
import { Drawer, Modal } from "antd";

const { useToggle, getToggleInstance } = createToggleClient();

const ModalComponent = ({
  id,
  initState,
}: {
  id: string;
  initState: "on" | "off";
}) => {
  const [value, { onClose }] = useToggle({ id, initState });
  return (
    <>
      <Modal open={value === "on"} onCancel={onClose}>
        <div>ModalContent</div>
      </Modal>
    </>
  );
};

const DrawerComponent = ({
  id,
  initState,
}: {
  id: string;
  initState: "on" | "off";
}) => {
  const [value, { onClose }] = useToggle({ id, initState });
  return (
    <>
      <Drawer open={value === "on"} onClose={onClose}>
        <div>DrawerContent</div>
      </Drawer>
    </>
  );
};

const SomeComponent = () => {
  const userModalInstance = getToggleInstance("userModal");
  const userDrawerInstance = getToggleInstance("userDrawer");
  return (
    <>
      <div>
        <button onClick={() => userModalInstance?.onOpen()}>Open</button>
        <button onClick={() => userModalInstance?.onClose()}>Close</button>
        <button onClick={() => userModalInstance?.onToggle()}>Toggle</button>
      </div>
      <br />
      <div>
        <button onClick={() => userDrawerInstance?.onOpen()}>Open</button>
        <button onClick={() => userDrawerInstance?.onClose()}>Close</button>
        <button onClick={() => userDrawerInstance?.onToggle()}>Toggle</button>
      </div>
    </>
  );
};

const SomeComponentWatcher = () => {
  const [value] = useToggle({ id: "userModal" });
  const drawerReference = getToggleInstance("userDrawer");
  useEffect(() => {
    drawerReference?.onChange((payload) => {
      console.log("value changed", payload, drawerReference?.getState());
    });
  }, []);
  return <>{value}</>;
};

const HomePageToggle = () => {
  return (
    <>
      <ModalComponent id="userModal" initState="off" />
      <ModalComponent id="authModal" initState="off" />
      <DrawerComponent id="userDrawer" initState="off" />
      <DrawerComponent id="authDrawer" initState="off" />
      <SomeComponent />
      <SomeComponentWatcher />
    </>
  );
};

export { HomePageToggle };
