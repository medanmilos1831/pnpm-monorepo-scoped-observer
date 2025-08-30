import React from "react";
import TitleBox from "./TitleBox";
import IndicatorBox from "./IndicatorBox";
import Light from "./Light";
import ControllerBox from "./ControllerBox";
import SwitchButton from "./SwitchButton";
import { useAccordion } from "../../../../services/visibilityService";

export const AccordionDomain: React.FC = () => {
  // Accordion hooks for different entities
  const userAccordion = useAccordion("user", { initState: "close" });
  const cityAccordion = useAccordion("city", { initState: "close" });
  const companyAccordion = useAccordion("company", { initState: "close" });
  const productAccordion = useAccordion("product", { initState: "close" });
  const orderAccordion = useAccordion("order", { initState: "close" });
  const paymentAccordion = useAccordion("payment", { initState: "close" });

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
              { value: "user", label: "User", accordion: userAccordion },
              { value: "city", label: "City", accordion: cityAccordion },
              { value: "company", label: "Company", accordion: companyAccordion },
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
              { value: "product", label: "Product", accordion: productAccordion },
              { value: "order", label: "Order", accordion: orderAccordion },
              { value: "payment", label: "Payment", accordion: paymentAccordion },
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
              { value: "user", label: "User", accordion: userAccordion },
              { value: "city", label: "City", accordion: cityAccordion },
              { value: "company", label: "Company", accordion: companyAccordion },
            ].map((item, i) => (
              <SwitchButton
                key={item.value}
                value={item.value}
                label={item.label}
                onChange={(checked) => {
                  if (checked) {
                    console.log("open");
                    item.accordion.open();
                  } else {
                    console.log("close");
                    item.accordion.close();
                  }
                }}
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
              { value: "product", label: "Product", accordion: productAccordion },
              { value: "order", label: "Order", accordion: orderAccordion },
              { value: "payment", label: "Payment", accordion: paymentAccordion },
            ].map((item, i) => (
              <SwitchButton
                key={item.value}
                value={item.value}
                label={item.label}
                onChange={(checked) => {
                  if (checked) {
                    console.log("open");
                    item.accordion.open();
                  } else {
                    console.log("close");
                    item.accordion.close();
                  }
                }}
              />
            ))}
          </div>
        </ControllerBox>
      </div>
    </>
  );
};

export default AccordionDomain;
