import React from 'react';

export function EmptyState({ icon: Icon, title, description, action, className = '' }) {
  return (
    <div className={`empty-state ${className}`}>
      {Icon && <Icon size={48} className="empty-state-icon" />}
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
