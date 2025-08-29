import React from "react";
import { WizzardHandler } from "../../../services/wizzardService";

interface DemoControlsProps {
  wizzardName: string;
}

export function DemoControls({ wizzardName }: DemoControlsProps) {
  return (
    <div className="demo-controls">
      <h3>Demo Controls</h3>
      <div className="control-buttons">
        <WizzardHandler name={wizzardName}>
          {({ goToStep }) => (
            <>
              <button
                onClick={() => goToStep("one")}
                className="control-btn"
              >
                Go to Step 1
              </button>
              <button
                onClick={() => goToStep("three")}
                className="control-btn"
              >
                Go to Step 3
              </button>
              <button
                onClick={() => goToStep("five")}
                className="control-btn"
              >
                Go to Step 5
              </button>
            </>
          )}
        </WizzardHandler>
      </div>
      <div className="control-info">
        <p>
          <strong>Tip:</strong> Use these buttons to test direct navigation
          between different steps. You can also use the sidebar for navigation.
        </p>
      </div>
    </div>
  );
}
