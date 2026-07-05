import React, { useState, useEffect } from 'react';

export function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 300); // Wait for animation
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible && !onClose) return null;

  const colors = {
    info: 'var(--info)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)'
  };

  return (
    <div className="toast-container">
      <div className="toast" style={{ borderLeft: `4px solid ${colors[type]}` }}>
        <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>
          {message}
        </span>
      </div>
    </div>
  );
}
