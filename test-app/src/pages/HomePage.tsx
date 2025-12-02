import { createReactToggleObserver } from "../toggle/react-toogle-observer";
import { Button, Modal } from "antd";

const toggleObservers = createReactToggleObserver({
  userModal: {
    logger: (params) => {
      console.log("MODAL LOGGER", params);
    },
  },
  authModal: {
    logger: (params) => {
      console.log("DRAWER LOGGER", params);
    },
  },
});
const { userModal, authModal } = toggleObservers;
const { useToggle: useUserModal, useInterceptor: useUserModalInterceptor } =
  userModal;

const { useToggle: useAuthToggle, useInterceptor: useAuthInterceptor } =
  authModal;

const UserModalComponent = () => {
  const [value, close, message] = useUserModal(false);
  return (
    <Modal open={value} onCancel={() => close()} onOk={() => close()}>
      <h1>User Modal</h1>
    </Modal>
  );
};
const SomeComponent = () => {
  return (
    <>
      <Button onClick={() => userModal.open()}>Open Modal</Button>
    </>
  );
};
const HomePage = () => {
  return (
    <>
      <UserModalComponent />
      <SomeComponent />
    </>
  );
};

export { HomePage };
