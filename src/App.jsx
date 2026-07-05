import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { RBACProvider, useRBAC } from './context/RBACContext';
import { AppLayout } from './components/layout/AppLayout';
import {
  Dashboard, Subscription, Usage, Invoices, PaymentMethods,
  SeatManagement, Team, Roles, AuditLog, Settings
} from './pages';
import { AccessDenied } from './pages/AccessDenied';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { canAccessPage } = useRBAC();

  if (!canAccessPage(location.pathname)) {
    return <AccessDenied />;
  }

  return children;
}

function App() {
  return (
    <RBACProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
            <Route path="usage" element={<ProtectedRoute><Usage /></ProtectedRoute>} />
            <Route path="invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
            <Route path="payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
            <Route path="seat-management" element={<ProtectedRoute><SeatManagement /></ProtectedRoute>} />
            <Route path="team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
            <Route path="roles" element={<ProtectedRoute><Roles /></ProtectedRoute>} />
            <Route path="audit-log" element={<ProtectedRoute><AuditLog /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RBACProvider>
  );
}

export default App;
