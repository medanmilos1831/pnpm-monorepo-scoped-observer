import React from "react";
import TitleBox from "./TitleBox";
import IndicatorBox from "./IndicatorBox";
import Light from "./Light";
import ControllerBox from "./ControllerBox";
import SwitchButton from "./SwitchButton";
import { useDrawer } from "../../../../services/visibilityService";

export const DrawerDomain: React.FC = () => {
  // Drawer hooks for different entities
  const userDrawer = useDrawer("user", { initState: "close" });
  const cityDrawer = useDrawer("city", { initState: "close" });
  const companyDrawer = useDrawer("company", { initState: "close" });
  const productDrawer = useDrawer("product", { initState: "close" });
  const orderDrawer = useDrawer("order", { initState: "close" });
  const paymentDrawer = useDrawer("payment", { initState: "close" });

  return (
    <>
      {/* Title Box */}
      <div style={{ width: "100%" }}>
        <TitleBox title="Drawer" />
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
              { value: "user", label: "User", drawer: userDrawer },
              { value: "city", label: "City", drawer: cityDrawer },
              { value: "company", label: "Company", drawer: companyDrawer },
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
              { value: "product", label: "Product", drawer: productDrawer },
              { value: "order", label: "Order", drawer: orderDrawer },
              { value: "payment", label: "Payment", drawer: paymentDrawer },
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
              { value: "user", label: "User", drawer: userDrawer },
              { value: "city", label: "City", drawer: cityDrawer },
              { value: "company", label: "Company", drawer: companyDrawer },
            ].map((item, i) => (
              <SwitchButton
                key={item.value}
                value={item.value}
                label={item.label}
                onChange={(checked) => {
                  if (checked) {
                    console.log("open");
                    item.drawer.open();
                  } else {
                    console.log("close");
                    item.drawer.close();
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
              { value: "product", label: "Product", drawer: productDrawer },
              { value: "order", label: "Order", drawer: orderDrawer },
              { value: "payment", label: "Payment", drawer: paymentDrawer },
            ].map((item, i) => (
              <SwitchButton
                key={item.value}
                value={item.value}
                label={item.label}
                onChange={(checked) => {
                  if (checked) {
                    console.log("open");
                    item.drawer.open();
                  } else {
                    console.log("close");
                    item.drawer.close();
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

export default DrawerDomain;
