import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  PenTool, LayoutDashboard, CreditCard, BarChart3, FileText, 
  Wallet, Users, UsersRound, Shield, History, Settings, Moon, Sun
} from 'lucide-react';
import { useRBAC, ROLES } from '../../context/RBACContext';
import { Avatar } from '../ui/Avatar';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/subscription', label: 'Subscription', icon: CreditCard },
  { path: '/usage', label: 'Usage', icon: BarChart3 },
  { path: '/invoices', label: 'Invoices', icon: FileText },
  { path: '/payment-methods', label: 'Payment Methods', icon: Wallet },
  { path: '/seat-management', label: 'Seat Management', icon: Users },
  { path: '/team', label: 'Team', icon: UsersRound },
  { path: '/roles', label: 'Roles & Permissions', icon: Shield },
  { path: '/audit-log', label: 'Audit Log', icon: History },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { currentRole, setCurrentRole, currentUser, canAccessPage } = useRBAC();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <PenTool className="sidebar-logo-icon" size={24} />
          <span className="sidebar-text">Nimbus AI</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.filter(item => canAccessPage(item.path)).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={18} style={{ minWidth: '18px' }} />
            <span className="sidebar-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {/* Mock Role Switcher */}
        <div className="sidebar-role-switcher" style={{ backgroundColor: 'var(--bg)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
          <p className="sidebar-text" style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)', fontWeight: 600, textTransform: 'uppercase' }}>
            Demo Role Switcher
          </p>
          <select 
            className="input-field" 
            style={{ width: '100%', padding: 'var(--space-1) var(--space-2)', fontSize: 'var(--font-xs)' }}
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
          >
            {Object.values(ROLES).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="sidebar-user-container">
          <Avatar initials={currentUser?.avatar} size="sm" />
          <div className="sidebar-user-info">
            <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{currentUser?.name}</div>
            <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{currentUser?.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
