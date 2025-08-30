import React from "react";
import { useTooltip } from "../../../../services/visibilityService";

interface ControllerBoxProps {
  children: React.ReactNode;
}

const ControllerBox: React.FC<ControllerBoxProps> = ({ children }) => {
  // const api = useTooltip("user", {
  //   initState: "close",
  // });
  return (
    <div
      style={{
        flex: 1,
        padding: "1.5rem",
        borderRadius: "8px",
        border: "1px solid #404040",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "120px",
      }}
    >
      <h3 style={{ color: "#00bcd4", marginBottom: "1rem" }}>controller</h3>

      {/* Switch Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ControllerBox;
