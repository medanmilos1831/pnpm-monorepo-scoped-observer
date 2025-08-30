import React from "react";
import { Switch } from "@mui/material";

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
          fontSize: "0.7rem",
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </span>
      <Switch
        sx={{ transform: "rotate(90deg)" }}
        onChange={(e, checked) => onChange?.(checked)}
      />
    </div>
  );
};

export default SwitchButton;
