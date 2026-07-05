import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  className = '', 
  ...props 
}) {
  const baseClass = `btn btn-${variant} btn-${size} ${className}`;
  
  return (
    <button className={baseClass.trim()} {...props}>
      {Icon && <Icon size={size === 'sm' ? 14 : 18} />}
      {children}
    </button>
  );
}
