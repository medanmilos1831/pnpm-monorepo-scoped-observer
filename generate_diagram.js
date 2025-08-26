#!/usr/bin/env node
/**
 * Generate a visual diagram of the React Visibility Service Architecture
 * Using Node.js Canvas for PNG generation
 */

const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');

// Create canvas
const width = 1600;
const height = 1200;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Colors
const colors = {
    background: '#f8f9fa',
    react: '#61dafb',
    visibility: '#ff6b6b',
    stateMachine: '#4ecdc4',
    coreObserver: '#45b7d1',
    api: '#f9ca24',
    text: '#2c3e50',
    border: '#34495e',
    white: '#ffffff',
    shadow: 'rgba(0,0,0,0.1)'
};

// Helper function to draw rounded rectangle
function drawRoundedRect(x, y, width, height, radius, fillColor, strokeColor, lineWidth = 2) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    
    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}

// Helper function to draw text with shadow
function drawText(text, x, y, fontSize, fontFamily, color, align = 'center', baseline = 'middle') {
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    
    // Add shadow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    ctx.fillText(text, x, y);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

// Helper function to draw arrow
function drawArrow(fromX, fromY, toX, toY, color, lineWidth = 3) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // Draw arrowhead
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const arrowLength = 15;
    const arrowAngle = Math.PI / 6;
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - arrowLength * Math.cos(angle - arrowAngle),
        toY - arrowLength * Math.sin(angle - arrowAngle)
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - arrowLength * Math.cos(angle + arrowAngle),
        toY - arrowLength * Math.sin(angle + arrowAngle)
    );
    ctx.stroke();
}

// Clear canvas
ctx.fillStyle = colors.background;
ctx.fillRect(0, 0, width, height);

// Title
drawText('React Visibility Service Architecture', width/2, 80, 36, 'Arial', colors.text, 'center', 'middle');
drawText('Complete system overview and data flow diagram', width/2, 130, 20, 'Arial', colors.text, 'center', 'middle');

// React Components Section
drawText('⚛️ React Components', 200, 200, 24, 'Arial', colors.text, 'center', 'middle');

// Component boxes
drawRoundedRect(50, 230, 300, 60, 10, colors.white, colors.react);
drawText('Component', 200, 260, 18, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(50, 310, 300, 60, 10, colors.white, colors.react);
drawText('useVisibility Hook', 200, 340, 18, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(50, 390, 300, 60, 10, colors.white, colors.react);
drawText('VisibilityHandler', 200, 420, 18, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(50, 470, 300, 60, 10, colors.white, colors.react);
drawText('useWatch Hook', 200, 500, 18, 'Arial', colors.text, 'center', 'middle');

// Visibility Instance Section
drawText('👁️ Visibility Instance', 800, 200, 24, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(650, 230, 300, 60, 10, colors.white, colors.visibility);
drawText('VisibilityInstance', 800, 260, 18, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(650, 310, 300, 60, 10, colors.white, colors.stateMachine);
drawText('State Machine', 800, 340, 18, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(650, 390, 300, 60, 10, colors.white, colors.api);
drawText('API Methods', 800, 420, 18, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(650, 470, 300, 60, 10, colors.white, colors.stateMachine);
drawText('States: open | close', 800, 500, 18, 'Arial', colors.text, 'center', 'middle');

// State Machine Engine Section
drawText('⚙️ State Machine Engine', 1400, 200, 24, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(1250, 230, 300, 60, 10, colors.white, colors.stateMachine);
drawText('@scoped-observer/react-state-machine', 1400, 260, 16, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(1250, 310, 300, 60, 10, colors.white, colors.stateMachine);
drawText('createMachine', 1400, 340, 18, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(1250, 390, 300, 60, 10, colors.white, colors.stateMachine);
drawText('State Transitions', 1400, 420, 18, 'Arial', colors.text, 'center', 'middle');

// Core Observer Section
drawText('🔗 Core Observer System', 800, 600, 24, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(650, 630, 300, 60, 10, colors.white, colors.coreObserver);
drawText('@scoped-observer/core', 800, 660, 18, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(550, 710, 200, 50, 8, colors.white, colors.coreObserver);
drawText('ScopedObserver', 650, 735, 16, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(950, 710, 200, 50, 8, colors.white, colors.coreObserver);
drawText('EventEntity', 1050, 735, 16, 'Arial', colors.text, 'center', 'middle');

drawRoundedRect(650, 780, 300, 60, 10, colors.white, colors.coreObserver);
drawText('Event Management', 800, 810, 18, 'Arial', colors.text, 'center', 'middle');

// Data Flow Section
drawText('🔄 Data Flow Architecture', width/2, 900, 28, 'Arial', colors.text, 'center', 'middle');

// Flow boxes
const flowY = 950;
const flowSpacing = 200;

drawRoundedRect(100, flowY, 150, 50, 25, colors.react, colors.border);
drawText('Component', 175, flowY + 25, 16, 'Arial', colors.white, 'center', 'middle');

drawRoundedRect(300, flowY, 150, 50, 25, colors.react, colors.border);
drawText('useVisibility', 375, flowY + 25, 16, 'Arial', colors.white, 'center', 'middle');

drawRoundedRect(500, flowY, 150, 50, 25, colors.visibility, colors.border);
drawText('VisibilityInstance', 575, flowY + 25, 16, 'Arial', colors.white, 'center', 'middle');

drawRoundedRect(700, flowY, 150, 50, 25, colors.stateMachine, colors.border);
drawText('State Machine', 775, flowY + 25, 16, 'Arial', colors.white, 'center', 'middle');

drawRoundedRect(900, flowY, 150, 50, 25, colors.coreObserver, colors.border);
drawText('Core Observer', 975, flowY + 25, 16, 'Arial', colors.white, 'center', 'middle');

// Draw arrows between flow boxes
drawArrow(250, flowY + 25, 300, flowY + 25, colors.border);
drawArrow(450, flowY + 25, 500, flowY + 25, colors.border);
drawArrow(650, flowY + 25, 700, flowY + 25, colors.border);
drawArrow(850, flowY + 25, 900, flowY + 25, colors.border);

// Main arrows
drawArrow(350, 260, 650, 260, colors.border, 4);
drawArrow(800, 310, 800, 630, colors.border, 4);
drawArrow(950, 340, 1250, 340, colors.border, 4);

// State transitions
drawArrow(650, 500, 950, 500, colors.border, 2);
drawText('ON_CLOSE', 800, 480, 14, 'Arial', colors.text, 'center', 'middle');

drawArrow(950, 470, 650, 470, colors.border, 2);
drawText('ON_OPEN', 800, 450, 14, 'Arial', colors.text, 'center', 'middle');

// API connections
drawArrow(700, 420, 700, 500, colors.border, 2);
drawArrow(800, 420, 800, 500, colors.border, 2);
drawArrow(900, 420, 900, 500, colors.border, 2);

// Legend
const legendY = 1050;
const legendSpacing = 250;

// React
ctx.fillStyle = colors.react;
ctx.fillRect(50, legendY, 20, 20);
drawText('React Components', 100, legendY + 10, 16, 'Arial', colors.text, 'left', 'middle');

// Visibility
ctx.fillStyle = colors.visibility;
ctx.fillRect(300, legendY, 20, 20);
drawText('Visibility Instance', 350, legendY + 10, 16, 'Arial', colors.text, 'left', 'middle');

// State Machine
ctx.fillStyle = colors.stateMachine;
ctx.fillRect(550, legendY, 20, 20);
drawText('State Machine', 600, legendY + 10, 16, 'Arial', colors.text, 'left', 'middle');

// Core Observer
ctx.fillStyle = colors.coreObserver;
ctx.fillRect(800, legendY, 20, 20);
drawText('Core Observer', 850, legendY + 10, 16, 'Arial', colors.text, 'left', 'middle');

// API
ctx.fillStyle = colors.api;
ctx.fillRect(1050, legendY, 20, 20);
drawText('API Methods', 1100, legendY + 10, 16, 'Arial', colors.text, 'left', 'middle');

// Save the image
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('visibility_service_diagram.png', buffer);

console.log('✅ Diagram saved as visibility_service_diagram.png');
console.log('📊 Image dimensions:', width, 'x', height);
console.log('🎨 Colors used:', Object.keys(colors).length);