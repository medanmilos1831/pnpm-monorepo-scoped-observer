import React from "react";
import IndicatorBox from "./IndicatorBox";
import Light from "./Light";
import ControllerBox from "./ControllerBox";
import SwitchButton from "./SwitchButton";
import { useVisibility } from "../../../../services/visibilityService";

export const ModalDomain: React.FC = () => {
  // Modal hooks for different entities
  const userModal = useVisibility("user", { initState: "open" });
  const cityModal = useVisibility("city", { initState: "close" });
  const companyModal = useVisibility("company", { initState: "close" });
  const productModal = useVisibility("product", { initState: "close" });
  const orderModal = useVisibility("order", { initState: "close" });
  const paymentModal = useVisibility("payment", { initState: "close" });
  const loginModal = useVisibility("login", { initState: "close" });
  const confirmModal = useVisibility("confirm", { initState: "open" });
  const settingsModal = useVisibility("settings", { initState: "close" });
  const profileModal = useVisibility("profile", { initState: "open" });
  const notificationModal = useVisibility("notification", {
    initState: "close",
  });
  const helpModal = useVisibility("help", { initState: "close" });

  return (
    <>
      {/* Indicator Box */}
      <div style={{ width: "100%" }}>
        <IndicatorBox>
          {/* Row 1 - 6 indicators */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {[
              { value: "user", label: "User", modal: userModal },
              { value: "city", label: "City", modal: cityModal },
              { value: "company", label: "Company", modal: companyModal },
              { value: "product", label: "Product", modal: productModal },
              { value: "order", label: "Order", modal: orderModal },
              { value: "payment", label: "Payment", modal: paymentModal },
            ].map((item, i) => (
              <Light key={item.value} value={item.value} label={item.label} />
            ))}
          </div>

          {/* Row 2 - 6 indicators */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {[
              { value: "login", label: "Login", modal: loginModal },
              { value: "confirm", label: "Confirm", modal: confirmModal },
              { value: "settings", label: "Settings", modal: settingsModal },
              { value: "profile", label: "Profile", modal: profileModal },
              {
                value: "notification",
                label: "Notification",
                modal: notificationModal,
              },
              { value: "help", label: "Help", modal: helpModal },
            ].map((item, i) => (
              <Light key={item.value} value={item.value} label={item.label} />
            ))}
          </div>
        </IndicatorBox>
      </div>

      {/* Controller Box */}
      <div style={{ width: "100%" }}>
        <ControllerBox>
          {/* Row 1 - 6 switches */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {[
              { value: "user", label: "User", modal: userModal },
              { value: "city", label: "City", modal: cityModal },
              { value: "company", label: "Company", modal: companyModal },
              { value: "product", label: "Product", modal: productModal },
              { value: "order", label: "Order", modal: orderModal },
              { value: "payment", label: "Payment", modal: paymentModal },
            ].map((item, i) => (
              <SwitchButton
                key={item.value}
                value={item.value}
                label={item.label}
                onChange={(checked) => {
                  if (checked) {
                    item.modal.open();
                  } else {
                    item.modal.close();
                  }
                }}
              />
            ))}
          </div>

          {/* Row 2 - 6 switches */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {[
              { value: "login", label: "Login", modal: loginModal },
              { value: "confirm", label: "Confirm", modal: confirmModal },
              { value: "settings", label: "Settings", modal: settingsModal },
              { value: "profile", label: "Profile", modal: profileModal },
              {
                value: "notification",
                label: "Notification",
                modal: notificationModal,
              },
              { value: "help", label: "Help", modal: helpModal },
            ].map((item, i) => (
              <SwitchButton
                key={item.value}
                value={item.value}
                label={item.label}
                onChange={(checked) => {
                  if (checked) {
                    console.log("open");
                    item.modal.open();
                  } else {
                    console.log("close");
                    item.modal.close();
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

export default ModalDomain;
