import { Modal } from "antd";
import { useVisibility, useWatch } from "../../services/visibilityService";
import { HomeHeader, HomeContent, HomeFooter } from "./components";

export function HomePage() {
  const modalApi = useVisibility("userModal", { initState: "close" });
  const modalState = useWatch("userModal");

  const handleOpen = () => {
    modalApi.open({ message: "Hello from HomePage!" });
  };
  const handleClose = () => {
    modalApi.close();
  };

  return (
    <div>
      <h1>Home Page Hello</h1>

      <div style={{ marginTop: "2rem" }}>
        <HomeHeader />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <HomeContent />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <HomeFooter />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Visibility State Example</h3>
        <p>
          Current modal state: <strong>{modalState.state}</strong>
        </p>
        <div style={{ marginTop: "1rem" }}>
          <button onClick={handleOpen} style={{ padding: "0.5rem 1rem" }}>
            Open Modal
          </button>
        </div>
        <Modal
          title="Visibility State Modal"
          open={modalState.state === "open"}
          onCancel={handleClose}
          onOk={handleClose}
        >
          <div>
            <p>
              <strong>Modal is Open!</strong>
            </p>
            <p>
              Payload: <code>{JSON.stringify(modalState.payload)}</code>
            </p>
            <p>
              State: <code>{modalState.state}</code>
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
}
