import React from "react";
import TitleBox from "../components/TitleBox";
import IndicatorBox from "../components/IndicatorBox";
import Light from "../components/Light";
import ControllerBox from "../components/ControllerBox";
import SwitchButton from "../components/SwitchButton";

export const AccordionDomain: React.FC = () => {
  return (
    <>
      {/* Title Box */}
      <div style={{ width: "100%" }}>
        <TitleBox title="Accordion" />
      </div>

      {/* Indicator Box */}
      <div style={{ width: "100%" }}>
        <IndicatorBox>
          {/* Row 1 */}
          <div
            style={{
              display: "flex",
              gap: "3rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {[
              { value: "user", label: "User" },
              { value: "city", label: "City" },
              { value: "company", label: "Company" },
            ].map((item, i) => (
              <Light key={item.value} value={item.value} label={item.label} />
            ))}
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: "flex",
              gap: "3rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {[
              { value: "product", label: "Product" },
              { value: "order", label: "Order" },
              { value: "payment", label: "Payment" },
            ].map((item, i) => (
              <Light key={item.value} value={item.value} label={item.label} />
            ))}
          </div>
        </IndicatorBox>
      </div>

      {/* Controller Box */}
      <div style={{ width: "100%" }}>
        <ControllerBox>
          {/* Row 1 */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {[
              { value: "user", label: "User" },
              { value: "city", label: "City" },
              { value: "company", label: "Company" },
            ].map((item, i) => (
              <SwitchButton
                key={item.value}
                value={item.value}
                label={item.label}
              />
            ))}
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {[
              { value: "product", label: "Product" },
              { value: "order", label: "Order" },
              { value: "payment", label: "Payment" },
            ].map((item, i) => (
              <SwitchButton
                key={item.value}
                value={item.value}
                label={item.label}
              />
            ))}
          </div>
        </ControllerBox>
      </div>
    </>
  );
};

export default AccordionDomain;
