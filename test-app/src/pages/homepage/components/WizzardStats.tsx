import React from "react";

interface WizzardStatsProps {
  name: string;
  currentStep: string;
  activeStep: string;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
  infinite: boolean;
}

export function WizzardStats({
  name,
  currentStep,
  activeStep,
  totalSteps,
  isFirst,
  isLast,
  infinite,
}: WizzardStatsProps) {
  const progressPercentage = Math.round(((totalSteps - (totalSteps - 1)) / totalSteps) * 100);
  
  return (
    <div className="wizzard-stats">
      <div className="stats-header">
        <h3>Wizzard Statistics</h3>
      </div>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Name</div>
          <div className="stat-value">{name}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Current Step</div>
          <div className="stat-value">{currentStep}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Active Step</div>
          <div className="stat-value">{activeStep}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Total Steps</div>
          <div className="stat-value">{totalSteps}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Progress</div>
          <div className="stat-value">{progressPercentage}%</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Infinite Mode</div>
          <div className="stat-value">{infinite ? 'Yes' : 'No'}</div>
        </div>
      </div>
      
      <div className="status-indicators">
        <div className={`indicator ${isFirst ? 'active' : ''}`}>
          <span className="indicator-dot" />
          First Step
        </div>
        <div className={`indicator ${isLast ? 'active' : ''}`}>
          <span className="indicator-dot" />
          Last Step
        </div>
      </div>
    </div>
  );
}
