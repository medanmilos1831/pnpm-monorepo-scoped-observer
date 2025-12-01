import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { createToggleClient } from "../toggle";
import { Form } from "antd";

const { useToggle, getToggleInstance } = createToggleClient();

const ComponentOne = () => {
  const [value, commands] = useToggle({
    id: "userModal",
    initState: "off",
  });

  const { onOpen, onClose, onToggle } = commands;

  console.log("value component one", value);
  return (
    <>
      <h1>Component One</h1>
      <button onClick={onOpen}>Open</button>
      <button onClick={onClose}>Close</button>
      <button onClick={onToggle}>Toggle</button>
    </>
  );
};
const ComponentTwo = () => {
  const [value] = useToggle({
    id: "userModal",
  });
  return (
    <>
      <p style={{ color: value === "on" ? "green" : "red" }}>Value: {value}</p>
    </>
  );
};

const ComponentThree = () => {
  const value = getToggleInstance("userModal");
  console.log("useToggleInstance", value);
  return <></>;
};
const ComponentFour = () => {
  return <></>;
};
const HomePageToggle = () => {
  // console.log("form", form);
  // const userModal = useToggleState("userModal");
  // console.log("userModal", userModal);
  return (
    <div>
      {/* <Form form={form}> */}
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
      <ComponentFour />
      {/* </Form> */}
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
