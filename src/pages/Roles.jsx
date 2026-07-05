import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { Avatar } from '../components/ui/Avatar';
import { 
  Shield, Users, Lock, Eye, Minus, Check, Info, History, 
  UserCheck, AlertCircle, Settings, FileText, ChevronRight
} from 'lucide-react';

const INITIAL_ROLES = [
  {
    id: 'owner',
    name: 'Owner',
    description: 'Full administrative access to the entire organization, billing, and security settings.',
    usersCount: 1,
    color: 'var(--primary)',
    bgLight: 'var(--primary-light)',
    badgeColor: 'primary',
    responsibilities: 'Full system management, transfer ownership, organization deletion',
    users: [{ name: 'Jessica Pearson', avatar: 'JP', email: 'jessica.pearson@pearsonhardman.com' }],
    permissions: {
      system: 'Allowed',
      billing: 'Allowed',
      team: 'Allowed',
      security: 'Allowed'
    }
  },
  {
    id: 'billing_admin',
    name: 'Billing Admin',
    description: 'Manage subscription plans, payment methods, tax settings, and view invoice history.',
    usersCount: 2,
    color: 'var(--info)',
    bgLight: 'var(--info-light)',
    badgeColor: 'info',
    responsibilities: 'Subscription management, invoice downloads, billing address updates',
    users: [
      { name: 'Harvey Spector', avatar: 'HS', email: 'harvey.spector@pearsonhardman.com' },
      { name: 'Rachel Zane', avatar: 'RZ', email: 'rachel.zane@pearsonhardman.com' }
    ],
    permissions: {
      system: 'Restricted',
      billing: 'Allowed',
      team: 'Read Only',
      security: 'Restricted'
    }
  },
  {
    id: 'team_admin',
    name: 'Team Admin',
    description: 'Invite new team members, manage seat allocations, and configure workspace structures.',
    usersCount: 2,
    color: 'var(--success)',
    bgLight: 'var(--success-light)',
    badgeColor: 'success',
    responsibilities: 'Team invitations, seat purchases, user role allocation',
    users: [
      { name: 'Donna Paulsen', avatar: 'DP', email: 'donna.paulsen@pearsonhardman.com' },
      { name: 'Katrina Bennett', avatar: 'KB', email: 'katrina.bennett@pearsonhardman.com' }
    ],
    permissions: {
      system: 'Restricted',
      billing: 'Restricted',
      team: 'Allowed',
      security: 'Restricted'
    }
  },
  {
    id: 'member',
    name: 'Member',
    description: 'Standard access to AI writing tools, templates, and basic workspace features.',
    usersCount: 13,
    color: 'var(--text-secondary)',
    bgLight: 'var(--border-light)',
    badgeColor: 'default',
    responsibilities: 'AI workspace usage, project collaboration, template creation',
    users: [
      { name: 'Mike Ross', avatar: 'MR', email: 'mike.ross@pearsonhardman.com' },
      { name: 'Louis Litt', avatar: 'LL', email: 'louis.litt@pearsonhardman.com' },
      { name: 'Samantha Wheeler', avatar: 'SW', email: 'samantha.w@pearsonhardman.com' },
      { name: 'Gretchen Bodinski', avatar: 'GB', email: 'gretchen.b@pearsonhardman.com' },
      { name: 'Benjamin', avatar: 'BE', email: 'benjamin@pearsonhardman.com' },
      { name: 'Alex Williams', avatar: 'AW', email: 'alex.williams@pearsonhardman.com' },
      { name: 'Robert Zane', avatar: 'RZ', email: 'robert.zane@pearsonhardman.com' },
      { name: 'Dana Scott', avatar: 'DS', email: 'dana.scott@pearsonhardman.com' },
      { name: 'Brian Altman', avatar: 'BA', email: 'brian.altman@pearsonhardman.com' },
      { name: 'Jeff Malone', avatar: 'JM', email: 'jeff.malone@pearsonhardman.com' },
      { name: 'Harold Gunderson', avatar: 'HG', email: 'harold.gunderson@pearsonhardman.com' },
      { name: 'Sean Cahill', avatar: 'SC', email: 'sean.cahill@pearsonhardman.com' },
      { name: 'Oliver Grady', avatar: 'OG', email: 'oliver.grady@pearsonhardman.com' }
    ],
    permissions: {
      system: 'Restricted',
      billing: 'Restricted',
      team: 'Read Only',
      security: 'Restricted'
    }
  }
];

const MATRIX_DATA = [
  { resource: 'Dashboard', owner: 'Full Access', billing: 'View Only', team: 'View Only', member: 'View Only' },
  { resource: 'Subscription', owner: 'Full Access', billing: 'Full Access', team: 'No Access', member: 'No Access' },
  { resource: 'Invoices', owner: 'Full Access', billing: 'Full Access', team: 'No Access', member: 'No Access' },
  { resource: 'Payment Methods', owner: 'Full Access', billing: 'Full Access', team: 'No Access', member: 'No Access' },
  { resource: 'Usage', owner: 'Full Access', billing: 'View Only', team: 'View Only', member: 'View Only' },
  { resource: 'Seat Management', owner: 'Full Access', billing: 'View Only', team: 'Full Access', member: 'No Access' },
  { resource: 'Team Management', owner: 'Full Access', billing: 'No Access', team: 'Full Access', member: 'No Access' },
  { resource: 'Roles & Permissions', owner: 'Full Access', billing: 'No Access', team: 'View Only', member: 'No Access' },
  { resource: 'Audit Log', owner: 'Full Access', billing: 'View Only', team: 'View Only', member: 'No Access' },
  { resource: 'Settings', owner: 'Full Access', billing: 'View Only', team: 'No Access', member: 'No Access' },
];

export function Roles() {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Modal State
  const [changeForm, setChangeForm] = useState({
    user: 'Harvey Spector',
    currentRole: 'Billing Admin',
    newRole: 'Team Admin',
    reason: '',
    immediate: true
  });

  const allUsersWithRoles = roles.flatMap(role => 
    role.users.map(u => ({
      name: u.name,
      role: role.name
    }))
  ).filter(u => u.name !== 'Jessica Pearson');

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleRoleChangeSubmit = (e) => {
    e.preventDefault();
    
    // Update local mock user counts for demo purposes
    const updatedRoles = roles.map(r => {
      if (r.name === changeForm.currentRole) {
        return { ...r, usersCount: Math.max(0, r.usersCount - 1) };
      }
      if (r.name === changeForm.newRole) {
        return { ...r, usersCount: r.usersCount + 1 };
      }
      return r;
    });

    setRoles(updatedRoles);
    setIsChangeModalOpen(false);
    showToast(`Role updated for ${changeForm.user} to ${changeForm.newRole}`, 'success');
  };

  const renderAccessBadge = (access) => {
    switch (access) {
      case 'Full Access':
        return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--success)', fontWeight: 600, fontSize: 'var(--font-sm)' }}>✅ Full Access</span>;
      case 'View Only':
        return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--info)', fontWeight: 500, fontSize: 'var(--font-sm)' }}>👁 View Only</span>;
      default:
        return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-tertiary)', fontSize: 'var(--font-sm)' }}>➖ No Access</span>;
    }
  };

  const matrixColumns = [
    { header: 'Resource / Module', render: (row) => <span style={{ fontWeight: 600 }}>{row.resource}</span> },
    { header: 'Owner', render: (row) => renderAccessBadge(row.owner) },
    { header: 'Billing Admin', render: (row) => renderAccessBadge(row.billing) },
    { header: 'Team Admin', render: (row) => renderAccessBadge(row.team) },
    { header: 'Member', render: (row) => renderAccessBadge(row.member) },
  ];

  const getPermissionBadge = (level) => {
    switch (level) {
      case 'Allowed': return <Badge variant="success">Allowed</Badge>;
      case 'Read Only': return <Badge variant="info">Read Only</Badge>;
      default: return <Badge variant="danger">Restricted</Badge>;
    }
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 className="page-title">Roles & Permissions</h1>
          <p className="page-subtitle">Review RBAC configurations and access levels.</p>
        </div>
        <Button variant="primary" icon={UserCheck} onClick={() => setIsChangeModalOpen(true)}>Change User Role</Button>
      </div>

      {/* Role Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        {roles.map(role => (
          <Card key={role.id} style={{ cursor: 'pointer', transition: 'all 0.2s', borderLeft: `4px solid ${role.color}` }} onClick={() => setSelectedRole(role)}>
            <CardContent style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>{role.name}</span>
                <Badge variant={role.badgeColor}>{role.usersCount} {role.usersCount === 1 ? 'User' : 'Users'}</Badge>
              </div>
              <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>{role.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)', alignItems: 'start' }}>
        {/* Left: Permission Matrix */}
        <div style={{ gridColumn: 'span 2' }}>
          <Card>
            <CardHeader title="Permission Matrix" description="System access levels mapped across roles." />
            <div className="table-container">
              <Table columns={matrixColumns} data={MATRIX_DATA} />
            </div>
          </Card>
        </div>

        {/* Right: Best Practices & History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Best Practices */}
          <Card>
            <CardHeader title="RBAC Best Practices" />
            <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <Info size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600 }}>Principle of Least Privilege</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>Users should only have the minimum access necessary to complete tasks. Avoid over-provisioning Owner rights.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <Info size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600 }}>Quarterly Audit Review</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>Review user access, seat allocations, and custom roles every 90 days to maintain security compliance.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <Info size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600 }}>Limit Owner Accounts</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>Keep Owner seats limited to 1 or 2 accounts to minimize risk from credential leaks.</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* History */}
          <Card>
            <CardHeader title="Role Change History" />
            <CardContent style={{ padding: 'var(--space-6)' }}>
              <div style={{ position: 'relative', paddingLeft: 'var(--space-6)' }}>
                <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border)' }}></div>
                
                <div style={{ position: 'relative', marginBottom: 'var(--space-6)' }}>
                  <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--surface)' }}></div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>Harvey Spector promoted to Billing Admin</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>July 12, 2025 by Jessica Pearson</div>
                </div>

                <div style={{ position: 'relative', marginBottom: 'var(--space-6)' }}>
                  <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--border-light)', border: '2px solid var(--surface)' }}></div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>Louis Litt changed to Member</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>July 5, 2025 by Donna Paulsen</div>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--border-light)', border: '2px solid var(--surface)' }}></div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>Donna Paulsen became Team Admin</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>June 20, 2025 by Jessica Pearson</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Permission Categories Section */}
      <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>Grouped Permission Categories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        
        {/* Billing */}
        <Card>
          <CardHeader title="Billing Permissions" />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>Invoices</span>
              <Badge variant="success">Allowed</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>Subscriptions</span>
              <Badge variant="success">Allowed</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>Payments</span>
              <Badge variant="success">Allowed</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>Tax Settings</span>
              <Badge variant="success">Allowed</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Organization */}
        <Card>
          <CardHeader title="Organization Permissions" />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>Users</span>
              <Badge variant="info">Read Only</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>Teams</span>
              <Badge variant="info">Read Only</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>Seats</span>
              <Badge variant="danger">Restricted</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>Invitations</span>
              <Badge variant="danger">Restricted</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader title="Security Permissions" />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>Roles</span>
              <Badge variant="danger">Restricted</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>Audit Logs</span>
              <Badge variant="info">Read Only</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>Settings</span>
              <Badge variant="danger">Restricted</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)' }}>API Tokens</span>
              <Badge variant="danger">Restricted</Badge>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Role Details Drawer (Side Panel Modal) */}
      <Modal
        isOpen={!!selectedRole}
        onClose={() => setSelectedRole(null)}
        title={`${selectedRole?.name} Details`}
        footer={<Button variant="ghost" onClick={() => setSelectedRole(null)}>Close</Button>}
      >
        {selectedRole && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Description</div>
              <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.4 }}>{selectedRole.description}</p>
            </div>

            <div>
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Primary Responsibilities</div>
              <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{selectedRole.responsibilities}</div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-3)' }}>
              <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>Access Capabilities</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', backgroundColor: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: 'var(--font-xs)' }}>System Settings</span>
                  {getPermissionBadge(selectedRole.permissions.system)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', backgroundColor: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: 'var(--font-xs)' }}>Billing & Invoices</span>
                  {getPermissionBadge(selectedRole.permissions.billing)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', backgroundColor: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: 'var(--font-xs)' }}>Team / Seats</span>
                  {getPermissionBadge(selectedRole.permissions.team)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', backgroundColor: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: 'var(--font-xs)' }}>Security Configurations</span>
                  {getPermissionBadge(selectedRole.permissions.security)}
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-3)' }}>
              <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>Assigned Users</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {selectedRole.users.map((user, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <Avatar initials={user.avatar} size="sm" />
                    <div>
                      <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{user.name}</div>
                      <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>{user.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Change User Role Modal */}
      <Modal
        isOpen={isChangeModalOpen}
        onClose={() => setIsChangeModalOpen(false)}
        title="Change User Role"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsChangeModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleRoleChangeSubmit}>Confirm Change</Button>
          </>
        }
      >
        <form onSubmit={handleRoleChangeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <div className="input-group">
            <label className="input-label">Select User</label>
            <select 
              className="input-field"
              value={changeForm.user}
              onChange={(e) => {
                const selectedUser = e.target.value;
                const found = allUsersWithRoles.find(u => u.name === selectedUser);
                const currentRole = found ? found.role : 'Member';
                
                setChangeForm({
                  ...changeForm,
                  user: selectedUser,
                  currentRole
                });
              }}
            >
              {allUsersWithRoles.map(u => (
                <option key={u.name} value={u.name}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div className="input-group">
              <label className="input-label">Current Role</label>
              <input type="text" className="input-field" value={changeForm.currentRole} disabled />
            </div>
            <div className="input-group">
              <label className="input-label">New Role</label>
              <select 
                className="input-field"
                value={changeForm.newRole}
                onChange={(e) => setChangeForm({ ...changeForm, newRole: e.target.value })}
              >
                <option value="Member">Member</option>
                <option value="Team Admin">Team Admin</option>
                <option value="Billing Admin">Billing Admin</option>
                <option value="Owner">Owner</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Reason for Change</label>
            <textarea 
              className="input-field" 
              rows="3" 
              placeholder="e.g. User promoted to lead security audits"
              value={changeForm.reason}
              onChange={(e) => setChangeForm({ ...changeForm, reason: e.target.value })}
              required
            ></textarea>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <input 
              type="checkbox" 
              id="immediate-check" 
              checked={changeForm.immediate} 
              onChange={(e) => setChangeForm({ ...changeForm, immediate: e.target.checked })}
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="immediate-check" style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              Apply role change immediately
            </label>
          </div>
        </form>
      </Modal>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}
