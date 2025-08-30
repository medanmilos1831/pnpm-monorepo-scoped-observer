import React, { ReactNode } from "react";
import { useModal } from "../services/visibilityService";

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
  useModal("user", {
    initState: "open",
  });
  return (
    <div
      className={`ui-domain-wrapper ${className}`}
      style={{
        padding: "1.5rem",
        borderRadius: "8px",
        border: "1px solid #404040",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {title && (
        <h3
          style={{
            color: "#00bcd4",
            marginBottom: "1rem",
            margin: "0 0 1rem 0",
            fontSize: "1.2rem",
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
