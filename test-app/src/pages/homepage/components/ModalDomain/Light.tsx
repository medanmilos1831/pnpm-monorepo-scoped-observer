import React from "react";
import { useWatch } from "../../../../services/visibilityService";

interface LightProps {
  value: string;
  label: string;
}

const Light: React.FC<LightProps> = ({
  value,
  label,
}: {
  value: any;
  label: string;
}) => {
  const modalWatcher = useWatch(value, (state) => {
    return state.currentState;
  });

  // console.log(`Light ${value}:`, modalWatcher, typeof modalWatcher);

  // Check if modal is open
  const isOpen = modalWatcher === "open";
  const lightColor = isOpen ? "#00ff00" : "#ff4444";
  const statusText = isOpen ? "ON" : "OFF";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0.5rem",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        width: "80px",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
      }}
    >
      <span
        style={{
          color: "#e0e0e0",
          fontSize: "0.7rem",
          marginBottom: "0.3rem",
          fontWeight: "500",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "#e0e0e0",
          fontSize: "0.6rem",
          marginBottom: "0.4rem",
          fontWeight: "600",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        {statusText}
      </span>
      <div
        style={{
          width: "24px",
          height: "24px",
          backgroundColor: lightColor,
          borderRadius: "50%",
          boxShadow: `0 0 20px ${lightColor}, inset 0 0 10px rgba(255, 255, 255, 0.3)`,
          transition: "all 0.3s ease",
          animation: isOpen ? "pulse 2s infinite" : "none",
        }}
      />

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Light;
