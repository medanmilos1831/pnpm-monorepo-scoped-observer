import React from "react";

interface TitleBoxProps {
  title: string;
}

const TitleBox: React.FC<TitleBoxProps> = ({ title }) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "1.2rem",
        borderRadius: "12px",
        border: "1px solid rgba(64, 64, 64, 0.3)",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60px",
        background:
          "linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(0, 188, 212, 0.05))",
        boxShadow:
          "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
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
            "radial-gradient(circle at 20% 80%, rgba(0, 188, 212, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <h4
        style={{
          color: "#00bcd4",
          margin: 0,
          fontSize: "1.1rem",
          fontWeight: "600",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          letterSpacing: "0.5px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {title}
      </h4>
    </div>
  );
};

export default TitleBox;
