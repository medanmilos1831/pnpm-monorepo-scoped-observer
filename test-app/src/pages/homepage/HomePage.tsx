import React, { useState } from "react";
import { VisibilityProvider } from "../../react-visibility-state";
import { useVisibilityHandler } from "../../react-visibility-state/Provider/VisibilityProvider";
import { Drawer, Button, Space } from "antd";

const ModalOne = () => {
  return <div>Hello World</div>;
};

const DrawerContent = () => {
  return (
    <div>
      <h3>Drawer Content</h3>
      <p>This is a drawer with visibility state management!</p>
      <Space direction="vertical">
        <Button type="primary">Action 1</Button>
        <Button>Action 2</Button>
        <Button danger>Action 3</Button>
      </Space>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const { on, off } = useVisibilityHandler();

  return (
    <>
      {/* Modal */}
      <VisibilityProvider.Item name="modalOne">
        {({ state, payload: Element }) => {
          if (state === "on") {
            return <Element />;
          }
          return null;
        }}
      </VisibilityProvider.Item>

      {/* Drawer */}
      <VisibilityProvider.Item name="drawer">
        {({ state, payload }) => (
          console.log("state", payload),
          (
            <Drawer
              title="Visibility State Drawer"
              open={state === "on"}
              onClose={() => off("drawer")}
              placement="right"
              width={400}
            >
              {payload ? payload.source : "dadasdasdasdsadasdsadas"}
              {/* {payload && (
                <div
                  style={{ marginTop: 16, padding: 16, background: "#f5f5f5" }}
                >
                  <h4>Payload Data:</h4>
                  <pre>{JSON.stringify(payload, null, 2)}</pre>
                </div>
              )} */}
            </Drawer>
          )
        )}
      </VisibilityProvider.Item>

      <Space>
        <Button onClick={() => on("modalOne", () => <ModalOne />)}>
          Open Modal
        </Button>
        <Button onClick={() => off("modalOne")}>Close Modal</Button>
        <Button
          type="primary"
          onClick={() =>
            on("drawer", { source: "homepage", timestamp: Date.now() })
          }
        >
          Open Drawer
        </Button>
        <Button onClick={() => off("drawer")}>Close Drawer</Button>
        <Button onClick={() => setCounter(counter + 1)}>
          Increment Counter
        </Button>
      </Space>

      <h1>Counter: {counter}</h1>
    </>
  );
};
