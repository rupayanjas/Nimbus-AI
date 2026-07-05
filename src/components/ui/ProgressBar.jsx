import React from 'react';

export function ProgressBar({ value, max = 100, color = 'var(--primary)', className = '' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={`progress-container ${className}`}>
      <div 
        className="progress-bar" 
        style={{ width: `${percentage}%`, backgroundColor: color }} 
      />
    </div>
  );
}
