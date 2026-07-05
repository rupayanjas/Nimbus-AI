import React from 'react';
import { Card, CardContent } from './Card';

export function StatCard({ title, value, icon: Icon, description, trend, className = '' }) {
  return (
    <Card className={className}>
      <CardContent className="display-flex flex-column gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {title}
          </span>
          {Icon && <Icon size={16} color="var(--text-tertiary)" />}
        </div>
        <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>
          {value}
        </div>
        {(description || trend) && (
          <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
            {trend && <span style={{ color: trend.startsWith('+') ? 'var(--success)' : 'var(--danger)', marginRight: '4px' }}>{trend}</span>}
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
