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
        minHeight: "100vh",
        padding: "2rem",
        margin: "0",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        alignItems: "flex-start",
        gap: "2rem",
        justifyContent: "center",
      }}
    >
      <UIDomainWrapper title="UI Domain 1">
        <ModalDomain />
      </UIDomainWrapper>
      <UIDomainWrapper title="UI Domain 2">
        <TooltipDomain />
      </UIDomainWrapper>
      <UIDomainWrapper title="UI Domain 3">
        <DrawerDomain />
      </UIDomainWrapper>
      <UIDomainWrapper title="UI Domain 4">
        <AccordionDomain />
      </UIDomainWrapper>
    </div>
  );
};
