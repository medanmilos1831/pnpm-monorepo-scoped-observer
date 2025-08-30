import { createWizzard } from "../../react-wizzard";
import { getState, send } from "../../services/toggleMachine";
import { pera } from "../../services/visibilityService";
import { ContactInfo, ContactEmail, ContactPhone } from "./components";

const SomeComponent = () => {
  pera.useWatch("userModal", (data) => {
    return {
      isOpen: data.state === "open",
    };
  });
  return <div>Some Component</div>;
};

export function ContactPage() {
  const modal = pera.useVisibility("userModal", { initState: "close" });
  return (
    <div>
      <h1>Contact Page</h1>
      <SomeComponent />
    </div>
  );
}
