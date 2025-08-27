import { getState, send } from "../../services/toggleMachine";
import { ContactInfo, ContactEmail, ContactPhone } from "./components";

export function ContactPage() {
  return (
    <div>
      <h1>Contact Page</h1>
      <button
        onClick={() => {
          // console.log("helo", send({ type: "TOGGLE" }));
          send({ type: "TOGGLE" });
        }}
      >
        Toggle State
      </button>

      <div style={{ marginTop: "2rem" }}>
        <ContactInfo />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <ContactEmail />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <ContactPhone />
      </div>
    </div>
  );
}
