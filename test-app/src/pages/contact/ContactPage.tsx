import { createWizzard } from "../../react-wizzard";
import { getState, send } from "../../services/toggleMachine";
import { pera, VisibilityHandler } from "../../services/visibilityService";
import { ContactInfo, ContactEmail, ContactPhone } from "./components";

const SomeComponent = () => {
  pera.useWatch("userModal", (data) => {
    console.log(data);
    return {
      isOpen: data.state === "open",
    };
  });
  return (
    <div>
      Some Component
      <button onClick={() => console.log(pera.getItem("userModal").state)}>
        pera
      </button>
      <pera.VisibilityHandler name="userModal">
        {(data) => {
          console.log(data);
          return <>state: {data.state}</>;
        }}
      </pera.VisibilityHandler>
    </div>
  );
};

export function ContactPage() {
  const modal = pera.useVisibility("userModal", { initState: "close" });
  return (
    <div>
      <h1>Contact Page</h1>
      <SomeComponent />
      <button onClick={() => modal.open({ message: "milos" })}>open</button>
      <button onClick={() => modal.close()}>close</button>
    </div>
  );
}
