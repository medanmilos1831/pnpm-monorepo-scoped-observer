import { useStepParams, useWizardNavigate, useOnStepChange } from "../wizard";

const Controls = () => {
  const { nextStep, prevStep } = useWizardNavigate();
  const { isCompleted } = useStepParams();
  const { isFirst, isLast } = useOnStepChange((state) => {
    return {
      isFirst: state.isFirst,
      isLast: state.isLast,
    };
  });
  const pera = useOnStepChange((state) => {
    return {
      isFirst: state.isFirst,
      isLast: state.isLast,
    };
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#f9fafb",
      }}
    >
      {!isFirst && (
        <button
          onClick={prevStep}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#ffffff",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            color: "#374151",
            fontSize: "0.875rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            outline: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#d1d5db";
            e.currentTarget.style.backgroundColor = "#f3f4f6";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e5e7eb";
            e.currentTarget.style.backgroundColor = "#ffffff";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Previous
        </button>
      )}

      <button
        onClick={nextStep}
        disabled={!isCompleted}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: isCompleted ? "#3b82f6" : "#9ca3af",
          border: `2px solid ${isCompleted ? "#3b82f6" : "#9ca3af"}`,
          borderRadius: "8px",
          color: "#ffffff",
          fontSize: "0.875rem",
          fontWeight: "500",
          cursor: isCompleted ? "pointer" : "not-allowed",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isCompleted
            ? "0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.2)"
            : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          outline: "none",
          opacity: isCompleted ? 1 : 0.6,
        }}
        onMouseEnter={(e) => {
          if (isCompleted) {
            e.currentTarget.style.backgroundColor = "#2563eb";
            e.currentTarget.style.borderColor = "#2563eb";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.3)";
          }
        }}
        onMouseLeave={(e) => {
          if (isCompleted) {
            e.currentTarget.style.backgroundColor = "#3b82f6";
            e.currentTarget.style.borderColor = "#3b82f6";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.2)";
          }
        }}
        onMouseDown={(e) => {
          if (isCompleted) {
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
      >
        Next
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export { Controls };
