import React from "react";
import { useToggle, useBoolean } from "../../simple-toggle";

// Simple components - no over-engineering!
const WatcherOne: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        padding: "20px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h3>Watcher One</h3>
      <p>Counter deljiv sa 2</p>
    </div>
  );
};

const WatcherTwo: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        padding: "20px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h3>Watcher Two</h3>
      <p>Counter deljiv sa 3</p>
    </div>
  );
};

const WatcherThree: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        padding: "20px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h3>Watcher Three</h3>
      <p>Counter deljiv sa 5</p>
    </div>
  );
};

const Station: React.FC<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}> = ({ isOpen, onOpen, onClose }) => {
  return (
    <div
      style={{
        padding: "20px",
        background: "rgba(255,255,255,0.15)",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h3>Station</h3>
      <p>State: {isOpen ? "OPEN" : "CLOSE"}</p>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={onOpen}
          style={{
            padding: "6px 12px",
            margin: "0 4px",
            background: "#00bcd4",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Open
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "6px 12px",
            margin: "0 4px",
            background: "#ff6b6b",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const SimpleHomePage: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const [showStation, setShowStation] = useBoolean(true);
  const stationToggle = useToggle(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ marginBottom: "2rem", color: "#00bcd4" }}>
        Simple Toggle Demo
      </h1>

      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h3 style={{ marginBottom: "1rem", color: "#00bcd4" }}>
          Counter: {count}
        </h3>
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={() => setCount((c) => c + 1)}
            style={{
              padding: "8px 16px",
              margin: "0 4px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            +
          </button>
          <button
            onClick={() => setCount((c) => c - 1)}
            style={{
              padding: "8px 16px",
              margin: "0 4px",
              background: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            -
          </button>
          <button
            onClick={() => setCount(0)}
            style={{
              padding: "8px 16px",
              margin: "0 4px",
              background: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
          <button
            onClick={() => setShowStation(!showStation)}
            style={{
              padding: "8px 16px",
              margin: "0 4px",
              background: "#ff9800",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {showStation ? "Hide Station" : "Show Station"}
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <WatcherOne isVisible={count % 2 !== 0} />
        <WatcherTwo isVisible={count % 3 !== 0} />
        <WatcherThree isVisible={count % 5 !== 0} />
        {showStation && (
          <Station
            isOpen={stationToggle.isOpen}
            onOpen={stationToggle.open}
            onClose={stationToggle.close}
          />
        )}
      </div>
    </div>
  );
};
