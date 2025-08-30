import React from "react";
import ModalDomain from "./components/ModalDomain/ModalDomain";
import UIDomainWrapper from "../../components/UIDomainWrapper";

export const HomePage: React.FC = () => {
  return (
    <div
      style={{
        height: "100%",
        padding: "0 2rem",
        margin: "0",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        color: "#ffffff",
        alignItems: "center",
        gap: "2rem",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <UIDomainWrapper title="Application Domain">
        <ModalDomain />
      </UIDomainWrapper>
    </div>
  );
};
