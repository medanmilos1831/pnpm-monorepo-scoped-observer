import { useWizzard, useStep } from "../wizard";

const Controls = () => {
  const { prev, next, reset } = useWizzard();
  const { isLast, isFirst } = useStep();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #e9ecef",
      }}
    >
      <button onClick={() => reset()}>Reset</button>
      {!isFirst && (
        <button
          onClick={() => prev()}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "500",
            color: "#6c757d",
            backgroundColor: "white",
            border: "2px solid #e9ecef",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            minWidth: "100px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f8f9fa";
            e.currentTarget.style.borderColor = "#6c757d";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.borderColor = "#e9ecef";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          }}
        >
          ← Prev
        </button>
      )}

      <button
        onClick={() => next()}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "500",
          color: "white",
          backgroundColor: "#007bff",
          border: "2px solid #007bff",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 4px rgba(0,123,255,0.3)",
          minWidth: "100px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#0056b3";
          e.currentTarget.style.borderColor = "#0056b3";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,123,255,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#007bff";
          e.currentTarget.style.borderColor = "#007bff";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,123,255,0.3)";
        }}
      >
        {isLast ? "Finish" : "Next →"}
      </button>
    </div>
  );
};

export { Controls };
