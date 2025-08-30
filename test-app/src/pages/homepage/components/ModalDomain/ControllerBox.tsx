import React from "react";
import { useModal } from "../../../../services/visibilityService";

interface ControllerBoxProps {
  children: React.ReactNode;
}

const ControllerBox: React.FC<ControllerBoxProps> = ({ children }) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "1.5rem",
        borderRadius: "12px",
        border: "1px solid rgba(64, 64, 64, 0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "120px",
        background:
          "linear-gradient(145deg, rgba(45, 45, 45, 0.6), rgba(30, 30, 30, 0.8))",
        boxShadow:
          "0 6px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(0, 188, 212, 0.08) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <h3
        style={{
          color: "#00bcd4",
          marginBottom: "1rem",
          fontSize: "1.3rem",
          fontWeight: "700",
          textShadow:
            "0 0 20px rgba(0, 188, 212, 0.8), 0 2px 8px rgba(0, 0, 0, 0.6)",
          letterSpacing: "1px",
          position: "relative",
          zIndex: 1,
          textTransform: "uppercase",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        🎛️ Control Panel 🎛️
      </h3>

      {/* Switch Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
          width: "100%",
          position: "relative",
          zIndex: 1,
          padding: "1rem",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ControllerBox;
