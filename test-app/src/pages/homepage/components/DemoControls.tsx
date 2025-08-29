import React from "react";

interface DemoControlsProps {
  onGoToStep: (step: string) => void;
}

export function DemoControls({ onGoToStep }: DemoControlsProps) {
  return (
    <div className="demo-controls">
      <h3>Demo Controls</h3>
      <div className="control-buttons">
        <button onClick={() => onGoToStep("one")} className="control-btn">
          Go to Step 1
        </button>
        <button onClick={() => onGoToStep("three")} className="control-btn">
          Go to Step 3
        </button>
        <button onClick={() => onGoToStep("five")} className="control-btn">
          Go to Step 5
        </button>
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
