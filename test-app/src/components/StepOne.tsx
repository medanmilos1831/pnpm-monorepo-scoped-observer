import { useRef, useState } from "react";
import { data } from "../mock";
import { Modal } from "antd";
import {
  useMutateStep,
  useStepParams,
  useStepState,
  useWizardNavigate,
  useWizardReject,
} from "../wizard";

const StepOne = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<any>();
  useWizardReject((message) => {
    setOpen(true);
  });
  const { mutate } = useMutateStep();
  const params = useStepParams();
  const { state } = useStepState();
  const { nextStep } = useWizardNavigate();

  const isSelected = (accountId: number) => {
    return state?.id === accountId;
  };

  return (
    <>
      <Modal
        open={open}
        onOk={() => {
          nextStep();
        }}
      >
        <>pera</>
      </Modal>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#1a1a1a",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Select Account Type
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {data.accountType.map((account) => {
            const selected = isSelected(account.id);

            return (
              <button
                onClick={() => {
                  mutate((prev) => {
                    return {
                      ...prev,
                      isCompleted: true,
                      state: account,
                    };
                  });
                }}
                key={account.id}
                style={{
                  padding: "1.5rem 1rem",
                  border: selected ? "2px solid #3b82f6" : "2px solid #e5e7eb",
                  borderRadius: "12px",
                  backgroundColor: selected ? "#eff6ff" : "#ffffff",
                  cursor: "pointer",
                  color: selected ? "#1e40af" : "#374151",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontWeight: "500",
                  fontSize: "1rem",
                  boxShadow: selected
                    ? "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)"
                    : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                  transform: selected ? "translateY(-2px)" : "translateY(0)",
                  outline: "none",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!selected) {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selected) {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: selected ? "#3b82f6" : "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      color: selected ? "#ffffff" : "#6b7280",
                    }}
                  >
                    {account.name.charAt(0).toUpperCase()}
                  </div>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }}
                  >
                    {account.name}
                  </span>
                </div>

                {selected && (
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { StepOne };
