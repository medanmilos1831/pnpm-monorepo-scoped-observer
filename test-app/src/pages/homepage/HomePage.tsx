import React from "react";
import ModalDomain from "./components/ModalDomain/ModalDomain";
import TooltipDomain from "./components/TooltipDomain/TooltipDomain";
import DrawerDomain from "./components/DrawerDomain/DrawerDomain";
import AccordionDomain from "./components/AccordionDomain/AccordionDomain";
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
      <UIDomainWrapper title="UI Domain 1">
        <ModalDomain />
      </UIDomainWrapper>
      {/* <UIDomainWrapper title="UI Domain 2">
        <TooltipDomain />
      </UIDomainWrapper> */}
    </div>
  );
};
