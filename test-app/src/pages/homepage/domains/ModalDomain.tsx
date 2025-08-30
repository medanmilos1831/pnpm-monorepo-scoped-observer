import React from "react";
import TitleBox from "../components/TitleBox";
import IndicatorBox from "../components/IndicatorBox";
import Light from "../components/Light";
import ControllerBox from "../components/ControllerBox";
import SwitchButton from "../components/SwitchButton";
import { useModal } from "../../../services/visibilityService";

export const ModalDomain: React.FC = () => {
  // Modal hooks for different entities
  const userModal = useModal("user", { initState: "close" });
  const cityModal = useModal("city", { initState: "close" });
  const companyModal = useModal("company", { initState: "close" });
  const productModal = useModal("product", { initState: "close" });
  const orderModal = useModal("order", { initState: "close" });
  const paymentModal = useModal("payment", { initState: "close" });

  return (
    <>
      {/* Title Box */}
      <div style={{ width: "100%" }}>
        <TitleBox title="Modal" />
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
              { value: "user", label: "User", modal: userModal },
              { value: "city", label: "City", modal: cityModal },
              { value: "company", label: "Company", modal: companyModal },
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
              { value: "product", label: "Product", modal: productModal },
              { value: "order", label: "Order", modal: orderModal },
              { value: "payment", label: "Payment", modal: paymentModal },
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
              { value: "user", label: "User", modal: userModal },
              { value: "city", label: "City", modal: cityModal },
              { value: "company", label: "Company", modal: companyModal },
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
        </ControllerBox>
      </div>
    </>
  );
};

export default ModalDomain;
