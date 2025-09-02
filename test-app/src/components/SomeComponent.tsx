import React from "react";
import { useWatch } from "../services/visibilityService";

export const SomeComponent: React.FC = () => {
  const userState = useWatch("user", (state) => state.state);
  const userPayload = useWatch("user", (state) => state.payload);

  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "16px",
        border: "1px solid rgba(64, 64, 64, 0.3)",
        background:
          "linear-gradient(145deg, rgba(45, 45, 45, 0.8), rgba(30, 30, 30, 0.9))",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        marginTop: "2rem",
        maxWidth: "400px",
      }}
    >
      <h3
        style={{
          color: "#00bcd4",
          marginBottom: "1rem",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        Some Component
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "1rem",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#e0e0e0", margin: "0 0 0.5rem 0" }}>
            User State:
          </p>
          <span
            style={{
              color: userState === "open" ? "#00ff00" : "#ff4444",
              fontSize: "1.2rem",
              fontWeight: "bold",
              textShadow: `0 0 10px ${
                userState === "open" ? "#00ff00" : "#ff4444"
              }`,
            }}
          >
            {userState?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>

        {userPayload && (
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              width: "100%",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#e0e0e0", margin: "0 0 0.5rem 0" }}>
              User Payload:
            </p>
            <pre
              style={{
                color: "#00bcd4",
                fontSize: "0.9rem",
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {JSON.stringify(userPayload, null, 2)}
            </pre>
          </div>
        )}

        <div
          style={{
            padding: "1rem",
            borderRadius: "8px",
            background: "rgba(0, 188, 212, 0.1)",
            border: "1px solid rgba(0, 188, 212, 0.3)",
            width: "100%",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#00bcd4", margin: 0, fontSize: "0.9rem" }}>
            This component watches user visibility state using useWatch hook
          </p>
        </div>
      </div>
    </div>
  );
};

export default SomeComponent;
