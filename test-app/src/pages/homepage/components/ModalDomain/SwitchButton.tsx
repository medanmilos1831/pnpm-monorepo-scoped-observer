import React from "react";
import { Switch } from "@mui/material";
import { useModalWatch } from "../../../../services/visibilityService";

interface SwitchButtonProps {
  value: string;
  label: string;
  onChange?: (checked: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  value,
  label,
  onChange,
}) => {
  const modalWatcher = useModalWatch(value as any, (state) => {
    return state.currentState;
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0.8rem",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        minWidth: "80px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
        e.currentTarget.style.borderColor = "rgba(0, 188, 212, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
      }}
    >
      <span
        style={{
          color: "#e0e0e0",
          fontSize: "0.75rem",
          marginBottom: "0.6rem",
          fontWeight: "600",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
        }}
      >
        {label}
      </span>
      <Switch
        sx={{
          transform: "rotate(90deg)",
          "& .MuiSwitch-switchBase": {
            color: "#666",
          },
          "& .MuiSwitch-track": {
            backgroundColor: "#444",
          },
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#00bcd4",
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "rgba(0, 188, 212, 0.3)",
          },
        }}
        onChange={(e, checked) => onChange?.(checked)}
        checked={modalWatcher === "open"}
      />
    </div>
  );
};

export default SwitchButton;
