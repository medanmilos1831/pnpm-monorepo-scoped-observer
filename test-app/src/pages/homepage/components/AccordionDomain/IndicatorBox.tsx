import React from "react";
import Light from "./Light";

interface IndicatorBoxProps {
  children: React.ReactNode;
}

const IndicatorBox: React.FC<IndicatorBoxProps> = ({ children }) => {
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
      <h3 style={{ color: "#00bcd4", marginBottom: "1rem" }}>indicator</h3>

      {/* Indicator Lights */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          marginTop: "1rem",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default IndicatorBox;
