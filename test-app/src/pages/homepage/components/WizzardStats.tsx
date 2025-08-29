import React from "react";
import { useWatch } from "../../../services/wizzardService";

interface WizzardStatsProps {
  wizzardName: string;
}

export function WizzardStats({ wizzardName }: WizzardStatsProps) {
  const wizzardStats = useWatch(wizzardName, (data) => ({
    name: data.name,
    currentStep: data.currentStep,
    activeStep: data.activeStep,
    totalSteps: data.steps.length,
    isFirst: data.isFirst,
    isLast: data.isLast,
    infinite: data.infinite,
    steps: data.steps,
  }));

  if (!wizzardStats) {
    return (
      <div className="wizzard-stats">
        <div className="stats-header">
          <h3>Wizzard Statistics</h3>
        </div>
        <div className="loading">Loading stats...</div>
      </div>
    );
  }

  const { name, currentStep, activeStep, totalSteps, isFirst, isLast, infinite } = wizzardStats;
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
