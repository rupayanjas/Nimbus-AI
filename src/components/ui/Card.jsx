import React from 'react';

export function Card({ children, className = '', style }) {
  return <div className={`card ${className}`} style={style}>{children}</div>;
}

export function CardHeader({ title, description, className = '', style }) {
  return (
    <div className={`card-header ${className}`} style={style}>
      {title && <h3 className="card-title">{title}</h3>}
      {description && <p className="card-description">{description}</p>}
    </div>
  );
}

export function CardContent({ children, className = '', style }) {
  return <div className={`card-content ${className}`} style={style}>{children}</div>;
}

export function CardFooter({ children, className = '', style }) {
  return <div className={`card-footer ${className}`} style={style}>{children}</div>;
}
