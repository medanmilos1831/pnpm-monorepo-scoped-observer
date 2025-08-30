import React from "react";
import TitleBox from "./TitleBox";
import IndicatorBox from "./IndicatorBox";
import Light from "./Light";
import ControllerBox from "./ControllerBox";
import SwitchButton from "./SwitchButton";
import { useModal, useTooltip } from "../../../../services/visibilityService";

export const TooltipDomain: React.FC = () => {
  // Tooltip hooks for different entities
  const userTooltip = useTooltip("user", { initState: "close" });
  const cityTooltip = useTooltip("city", { initState: "close" });
  const companyTooltip = useTooltip("company", { initState: "close" });
  const productTooltip = useTooltip("product", { initState: "close" });
  const orderTooltip = useTooltip("order", { initState: "close" });
  const paymentTooltip = useTooltip("payment", { initState: "close" });

  return (
    <>
      {/* Title Box */}
      <div style={{ width: "100%" }}>
        <TitleBox title="Tooltip" />
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
              { value: "user", label: "User", tooltip: userTooltip },
              { value: "city", label: "City", tooltip: cityTooltip },
              { value: "company", label: "Company", tooltip: companyTooltip },
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
              { value: "product", label: "Product", tooltip: productTooltip },
              { value: "order", label: "Order", tooltip: orderTooltip },
              { value: "payment", label: "Payment", tooltip: paymentTooltip },
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
              { value: "user", label: "User", tooltip: userTooltip },
              { value: "city", label: "City", tooltip: cityTooltip },
              { value: "company", label: "Company", tooltip: companyTooltip },
            ].map((item, i) => (
              <SwitchButton
                key={item.value}
                value={item.value}
                label={item.label}
                onChange={(checked) => {
                  if (checked) {
                    console.log("open");
                    item.tooltip.open();
                  } else {
                    console.log("close");
                    item.tooltip.close();
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
              { value: "product", label: "Product", tooltip: productTooltip },
              { value: "order", label: "Order", tooltip: orderTooltip },
              { value: "payment", label: "Payment", tooltip: paymentTooltip },
            ].map((item, i) => (
              <SwitchButton
                key={item.value}
                value={item.value}
                label={item.label}
                onChange={(checked) => {
                  if (checked) {
                    console.log("open");
                    item.tooltip.open();
                  } else {
                    console.log("close");
                    item.tooltip.close();
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

export default TooltipDomain;
