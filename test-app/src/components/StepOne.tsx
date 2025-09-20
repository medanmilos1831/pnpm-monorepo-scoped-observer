import { data } from "../mock";

const StepOne = () => {
  return (
    <div>
      <h3>Select Account Type</h3>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {data.accountType.map((account) => {
          const isSelected = selectedAccount?.id === account.id;

          return (
            <button
              onClick={() => {
                mutateStep((prev: any) => {
                  return {
                    ...prev,
                    isCompleted: true,
                    state: account,
                  };
                });
              }}
              key={account.id}
              style={{
                padding: "10px 20px",
                border: isSelected ? "2px solid #007bff" : "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: isSelected ? "#e3f2fd" : "#f9f9f9",
                cursor: "pointer",
                color: isSelected ? "#007bff" : "#333",
                transition: "all 0.2s ease",
              }}
            >
              {account.name}
            </button>
          );
        })}
      </div> */}
    </div>
  );
};

export { StepOne };
