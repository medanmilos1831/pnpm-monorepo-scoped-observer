import { useState } from "react";
import { Modal } from "antd";
import {
  useMutateStep,
  useStepParams,
  useStepState,
  useWizardNavigate,
  useWizardReject,
} from "../wizard";

const StepTwo = () => {
  const [open, setOpen] = useState(false);

  useWizardReject((message) => {
    setOpen(true);
  });

  const { mutate } = useMutateStep();
  const params = useStepParams();
  const { state: stepOneState } = useStepState("stepOne");
  const { state } = useStepState();
  const { nextStep } = useWizardNavigate();

  const isSelected = (planId: number) => {
    return state?.id === planId;
  };

  const handlePlanSelect = (plan: any) => {
    mutate((prev) => {
      return {
        ...prev,
        isCompleted: true,
        state: plan,
      };
    });
  };

  return (
    <>
      <Modal
        open={open}
        onOk={() => {
          nextStep();
        }}
        onCancel={() => setOpen(false)}
      >
        <>Plan validation failed. Do you want to continue?</>
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
          Select Your Plan
        </h3>

        <p
          style={{
            fontSize: "1rem",
            color: "#666",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Choose the plan that best fits your needs
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {stepOneState?.plan?.map((plan: any) => (
            <div
              key={plan.id}
              onClick={() => handlePlanSelect(plan)}
              style={{
                padding: "1.5rem",
                border: `2px solid ${
                  isSelected(plan.id) ? "#1890ff" : "#e8e8e8"
                }`,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor: isSelected(plan.id) ? "#f6ffed" : "#fff",
                position: "relative",
                boxShadow: isSelected(plan.id)
                  ? "0 4px 12px rgba(24, 144, 255, 0.15)"
                  : "0 2px 8px rgba(0, 0, 0, 0.06)",
              }}
              onMouseEnter={(e) => {
                if (!isSelected(plan.id)) {
                  e.currentTarget.style.borderColor = "#1890ff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(24, 144, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected(plan.id)) {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0, 0, 0, 0.06)";
                }
              }}
            >
              {isSelected(plan.id) && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#1890ff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </div>
              )}

              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1a1a1a",
                  marginBottom: "0.5rem",
                  marginRight: isSelected(plan.id) ? "2rem" : "0",
                }}
              >
                {plan.name}
              </h4>

              {plan.isExtraInfoRequired && (
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "#fff7e6",
                    color: "#d46b08",
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                    fontWeight: "500",
                    marginTop: "0.5rem",
                  }}
                >
                  Extra Info Required
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { StepTwo };
