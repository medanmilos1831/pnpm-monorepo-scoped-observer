import React from "react";
import { data } from "../mock";
import { useMutateStep, useStep } from "../wizzard";

const StepOne = () => {
  const mutateStep = useMutateStep();
  const step = useStep();
  console.log("step", step);
  return (
    <div>
      <h3>Select Account Type</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {data.accountType.map((account) => (
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
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
            }}
          >
            {account.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export { StepOne };
