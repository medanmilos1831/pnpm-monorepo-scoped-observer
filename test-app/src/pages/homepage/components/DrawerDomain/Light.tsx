import React from "react";
import { useDrawerWatch } from "../../../../services/visibilityService";

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
  const drawerWatcher = useDrawerWatch(value, (state) => {
    return state.currentState;
  });

  console.log(`Light ${value}:`, drawerWatcher, typeof drawerWatcher);

  // Check if drawer is open
  const isOpen = drawerWatcher === "open";
  const lightColor = isOpen ? "#00ff00" : "#ff4444";
  const statusText = isOpen ? "ON" : "OFF";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span
        style={{
          color: "#e0e0e0",
          fontSize: "0.6rem",
          marginBottom: "0.2rem",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "#e0e0e0",
          fontSize: "0.6rem",
          marginBottom: "0.3rem",
        }}
      >
        {statusText}
      </span>
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: lightColor,
          borderRadius: "50%",
          boxShadow: `0 0 12px ${lightColor}`,
        }}
      />
    </div>
  );
};

export default Light;
