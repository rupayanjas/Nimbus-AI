import React from 'react';
import { Card, CardContent } from '../components/ui/Card';

export function PageWrapper({ title, description }) {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{description}</p>
      </div>
      <Card>
        <CardContent style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
          <p>Page content for <strong>{title}</strong> goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export { Dashboard } from './Dashboard';
export { Subscription } from './Subscription';
export { Usage } from './Usage';
export { Invoices } from './Invoices';
export { PaymentMethods } from './PaymentMethods';
export { SeatManagement } from './SeatManagement';
export { Team } from './Team';
export { Roles } from './Roles';
export { AuditLog } from './AuditLog';
export { Settings } from './Settings';
