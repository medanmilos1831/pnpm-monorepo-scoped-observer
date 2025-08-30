import React from "react";

interface TitleBoxProps {
  title: string;
}

const TitleBox: React.FC<TitleBoxProps> = ({ title }) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "1rem",
        borderRadius: "8px",
        border: "1px solid #404040",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60px",
      }}
    >
      <h4 style={{ color: "#00bcd4", margin: 0, fontSize: "1rem" }}>{title}</h4>
    </div>
  );
};

export default TitleBox;
