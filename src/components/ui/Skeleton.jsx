import React from 'react';

export function Skeleton({ width, height, borderRadius = 'var(--radius-md)', className = '' }) {
  return (
    <div 
      className={`skeleton ${className}`} 
      style={{ width, height, borderRadius }} 
    />
  );
}
