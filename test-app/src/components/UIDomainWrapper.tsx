import React from "react";
import type { ReactNode } from "react";

interface UIDomainWrapperProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const UIDomainWrapper: React.FC<UIDomainWrapperProps> = ({
  children,
  title,
  className = "",
}) => {
  return (
    <div
      className={`ui-domain-wrapper ${className}`}
      style={{
        width: "100%",
        padding: "1.5rem",
        borderRadius: "16px",
        border: "1px solid rgba(64, 64, 64, 0.3)",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(145deg, rgba(45, 45, 45, 0.8), rgba(30, 30, 30, 0.9))",
        backdropFilter: "blur(10px)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 188, 212, 0.1)",
        transition: "all 0.3s ease",
        position: "relative",
        zIndex: 1,
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 16px 48px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 188, 212, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 188, 212, 0.1)";
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "16px",
          background:
            "linear-gradient(45deg, transparent, rgba(0, 188, 212, 0.05), transparent)",
          pointerEvents: "none",
        }}
      />
      {title && (
        <h3
          style={{
            color: "#00bcd4",
            marginBottom: "1rem",
            margin: "0 0 1rem 0",
            fontSize: "1.3rem",
            fontWeight: "600",
            textShadow: "0 0 20px rgba(0, 188, 212, 0.5)",
            letterSpacing: "0.5px",
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default UIDomainWrapper;
