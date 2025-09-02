import React from "react";
import { useWatch } from "../services/visibilityService";

export const UserComponent: React.FC = () => {
  const userState = useWatch("user", (state) => state.state);
  const userPayload = useWatch("user", (state) => state.payload);

  return (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: "12px",
        border: "1px solid rgba(0, 188, 212, 0.3)",
        background:
          "linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(0, 150, 136, 0.05))",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 20px rgba(0, 188, 212, 0.2)",
        marginTop: "1rem",
        maxWidth: "300px",
        textAlign: "center",
      }}
    >
      <h4
        style={{
          color: "#00bcd4",
          margin: "0 0 1rem 0",
          fontSize: "1.3rem",
          fontWeight: "600",
        }}
      >
        👤 User Component
      </h4>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            width: "100%",
          }}
        >
          <p
            style={{
              color: "#e0e0e0",
              margin: "0 0 0.5rem 0",
              fontSize: "0.9rem",
            }}
          >
            Status:
          </p>
          <span
            style={{
              color: userState === "open" ? "#4caf50" : "#f44336",
              fontSize: "1rem",
              fontWeight: "bold",
              textShadow: `0 0 8px ${
                userState === "open" ? "#4caf50" : "#f44336"
              }`,
            }}
          >
            {userState === "open" ? "🟢 ACTIVE" : "🔴 INACTIVE"}
          </span>
        </div>

        {userPayload && (
          <div
            style={{
              padding: "0.8rem",
              borderRadius: "8px",
              background: "rgba(0, 188, 212, 0.15)",
              border: "1px solid rgba(0, 188, 212, 0.3)",
              width: "100%",
            }}
          >
            <p
              style={{
                color: "#00bcd4",
                margin: "0 0 0.5rem 0",
                fontSize: "0.9rem",
              }}
            >
              Data:
            </p>
            <div
              style={{
                color: "#ffffff",
                fontSize: "0.85rem",
                background: "rgba(0, 0, 0, 0.2)",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {JSON.stringify(userPayload, null, 1)}
            </div>
          </div>
        )}

        <div
          style={{
            padding: "0.6rem",
            borderRadius: "6px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "0.8rem",
            color: "#b0b0b0",
          }}
        >
          Watching user visibility state
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
