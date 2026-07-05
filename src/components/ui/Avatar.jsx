import React from 'react';

export function Avatar({ initials, size = 'md', className = '' }) {
  return (
    <div className={`avatar avatar-${size} ${className}`}>
      {initials}
    </div>
  );
}
