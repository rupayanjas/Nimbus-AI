import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { Avatar } from '../components/ui/Avatar';
import { Dropdown } from '../components/ui/Dropdown';
import { useRBAC } from '../context/RBACContext';
import { EmptyState } from '../components/ui/EmptyState';
import { ProgressBar } from '../components/ui/ProgressBar';
import { 
  Users, UserPlus, UserCheck, Inbox, Briefcase, 
  Search, MoreVertical, Edit2, ShieldAlert, UserMinus, Mail, Calendar, Clock, X, Info
} from 'lucide-react';

const INITIAL_MEMBERS = [
  { id: '1', name: 'Jessica Pearson', email: 'jessica.pearson@pearsonhardman.com', department: 'Legal', role: 'Owner', status: 'Active', lastActive: '2 min ago', avatar: 'JP', joined: 'Jan 12, 2024', lastLogin: 'Today, 02:40 PM' },
  { id: '2', name: 'Harvey Spector', email: 'harvey.spector@pearsonhardman.com', department: 'Litigation', role: 'Billing Admin', status: 'Active', lastActive: '5 min ago', avatar: 'HS', joined: 'Apr 05, 2024', lastLogin: 'Today, 02:37 PM' },
  { id: '3', name: 'Donna Paulsen', email: 'donna.paulsen@pearsonhardman.com', department: 'Operations', role: 'Team Admin', status: 'Away', lastActive: '1 hour ago', avatar: 'DP', joined: 'Mar 10, 2024', lastLogin: 'Today, 01:15 PM' },
  { id: '4', name: 'Louis Litt', email: 'louis.litt@pearsonhardman.com', department: 'Finance', role: 'Member', status: 'Active', lastActive: '10 min ago', avatar: 'LL', joined: 'Feb 15, 2024', lastLogin: 'Today, 02:32 PM' },
  { id: '5', name: 'Mike Ross', email: 'mike.ross@pearsonhardman.com', department: 'Associates', role: 'Member', status: 'Active', lastActive: '15 min ago', avatar: 'MR', joined: 'Jan 22, 2024', lastLogin: 'Today, 02:12 PM' },
  { id: '6', name: 'Rachel Zane', email: 'rachel.zane@pearsonhardman.com', department: 'Legal', role: 'Member', status: 'Active', lastActive: '1 hour ago', avatar: 'RZ', joined: 'May 01, 2024', lastLogin: 'Today, 01:10 PM' },
  { id: '7', name: 'Katrina Bennett', email: 'katrina.bennett@pearsonhardman.com', department: 'Corporate', role: 'Member', status: 'Active', lastActive: '30 min ago', avatar: 'KB', joined: 'Jan 18, 2024', lastLogin: 'Today, 12:45 PM' },
  { id: '8', name: 'Benjamin', email: 'benjamin@pearsonhardman.com', department: 'IT', role: 'Member', status: 'Suspended', lastActive: '2 weeks ago', avatar: 'BE', joined: 'Jun 01, 2024', lastLogin: 'Jun 15, 2026, 11:15 AM' },
  { id: '9', name: 'Gretchen Bodinski', email: 'gretchen.b@pearsonhardman.com', department: 'Operations', role: 'Member', status: 'Away', lastActive: '4 hours ago', avatar: 'GB', joined: 'Feb 20, 2024', lastLogin: 'Today, 10:20 AM' },
  { id: '10', name: 'Samantha Wheeler', email: 'samantha.w@pearsonhardman.com', department: 'Litigation', role: 'Member', status: 'Offline', lastActive: '3 days ago', avatar: 'SW', joined: 'Jul 10, 2024', lastLogin: 'Jun 28, 2026, 09:30 AM' },
  { id: '11', name: 'Alex Williams', email: 'alex.williams@pearsonhardman.com', department: 'Corporate', role: 'Member', status: 'Active', lastActive: '1 day ago', avatar: 'AW', joined: 'Jul 28, 2025', lastLogin: 'Yesterday, 04:15 PM' },
  { id: '12', name: 'Robert Zane', email: 'robert.zane@pearsonhardman.com', department: 'Legal', role: 'Member', status: 'Active', lastActive: '2 days ago', avatar: 'RZ', joined: 'Jul 29, 2025', lastLogin: '2 days ago, 11:00 AM' },
  { id: '13', name: 'Dana Scott', email: 'dana.scott@pearsonhardman.com', department: 'Corporate', role: 'Member', status: 'Active', lastActive: '3 hours ago', avatar: 'DS', joined: 'Jul 15, 2024', lastLogin: 'Today, 11:30 AM' },
  { id: '14', name: 'Brian Altman', email: 'brian.altman@pearsonhardman.com', department: 'Associates', role: 'Member', status: 'Active', lastActive: '5 hours ago', avatar: 'BA', joined: 'Jul 30, 2025', lastLogin: 'Today, 09:45 AM' },
  { id: '15', name: 'Jeff Malone', email: 'jeff.malone@pearsonhardman.com', department: 'Finance', role: 'Member', status: 'Active', lastActive: '1 week ago', avatar: 'JM', joined: 'Aug 05, 2024', lastLogin: '1 week ago' },
  { id: '16', name: 'Harold Gunderson', email: 'harold.gunderson@pearsonhardman.com', department: 'Associates', role: 'Member', status: 'Active', lastActive: '12 min ago', avatar: 'HG', joined: 'Sep 01, 2024', lastLogin: 'Today, 02:30 PM' },
  { id: '17', name: 'Sean Cahill', email: 'sean.cahill@pearsonhardman.com', department: 'Litigation', role: 'Member', status: 'Active', lastActive: '4 days ago', avatar: 'SC', joined: 'Oct 12, 2024', lastLogin: '4 days ago' },
  { id: '18', name: 'Oliver Grady', email: 'oliver.grady@pearsonhardman.com', department: 'Associates', role: 'Member', status: 'Active', lastActive: '8 min ago', avatar: 'OG', joined: 'Nov 15, 2024', lastLogin: 'Today, 02:35 PM' }
];

const INITIAL_INVITATIONS = [
  { id: 'inv_1', name: 'Jack Soloff', email: 'jack.soloff@pearsonhardman.com', role: 'Member', invitedBy: 'Jessica Pearson', date: 'Jul 28, 2025', status: 'Pending' },
  { id: 'inv_2', name: 'Monica Eton', email: 'monica.eton@pearsonhardman.com', role: 'Member', invitedBy: 'Harvey Spector', date: 'Jul 29, 2025', status: 'Pending' },
  { id: 'inv_3', name: 'Kevin Miller', email: 'kevin.miller@pearsonhardman.com', role: 'Member', invitedBy: 'Donna Paulsen', date: 'Jul 30, 2025', status: 'Pending' },
  { id: 'inv_4', name: 'Thomas Kessler', email: 'thomas.kessler@pearsonhardman.com', role: 'Member', invitedBy: 'Jessica Pearson', date: 'Jul 31, 2025', status: 'Pending' }
];

export function Team() {
  const { currentRole, canPerformAction, getActionDisabledTooltip } = useRBAC();
  const [toast, setToast] = useState(null);
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [invitations, setInvitations] = useState(INITIAL_INVITATIONS);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Form state
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', dept: 'Engineering', role: 'Member' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.email) return;

    const newInv = {
      id: Date.now().toString(),
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      invitedBy: 'Jessica Pearson',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Pending'
    };

    setInvitations([newInv, ...invitations]);
    setIsInviteModalOpen(false);
    setInviteForm({ name: '', email: '', dept: 'Engineering', role: 'Member' });
    showToast(`Invitation sent to ${inviteForm.email}!`, 'success');
  };

  const handleCancelInvitation = (id, email) => {
    setInvitations(invitations.filter(inv => inv.id !== id));
    showToast(`Invitation to ${email} cancelled.`, 'success');
  };

  const handleResendInvitation = (email) => {
    showToast(`Invitation resent to ${email}.`, 'success');
  };

  const handleUserAction = (action, user) => {
    if (action === 'Change Role' && !canPerformAction('change_role')) {
      showToast(getActionDisabledTooltip('change_role'), 'warning');
      return;
    }
    showToast(`${action} for ${user.name} processed.`, 'success');
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Owner': return <Badge variant="primary">Owner</Badge>;
      case 'Billing Admin': return <Badge variant="info" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>Billing Admin</Badge>;
      case 'Team Admin': return <Badge variant="success">Team Admin</Badge>;
      default: return <Badge variant="default">Member</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return <Badge variant="success">Active</Badge>;
      case 'Away': return <Badge variant="warning">Away</Badge>;
      case 'Suspended': return <Badge variant="danger">Suspended</Badge>;
      default: return <Badge variant="default">Offline</Badge>;
    }
  };

  // Filtered members
  const filteredMembers = members.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept ? user.department === selectedDept : true;
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    const matchesStatus = selectedStatus ? user.status === selectedStatus : true;
    return matchesSearch && matchesDept && matchesRole && matchesStatus;
  });

  const columns = [
    { 
      header: 'Member', 
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }} onClick={() => setSelectedUser(row)}>
          <Avatar initials={row.avatar} size="sm" />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</div>
            <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>{row.email}</div>
          </div>
        </div>
      )
    },
    { header: 'Department', accessor: 'department' },
    { header: 'Role', render: (row) => getRoleBadge(row.role) },
    { header: 'Status', render: (row) => getStatusBadge(row.status) },
    { header: 'Last Active', accessor: 'lastActive' },
    { 
      header: 'Actions', 
      render: (row) => (
        <Dropdown 
          trigger={<Button variant="ghost" size="sm" style={{ padding: '4px' }}><MoreVertical size={16} /></Button>}
          items={[
            { label: 'Edit User', icon: Edit2, onClick: () => handleUserAction('Edit User', row) },
            { label: 'Change Role', icon: UserCheck, onClick: () => handleUserAction('Change Role', row) },
            { label: 'Suspend User', icon: ShieldAlert, onClick: () => handleUserAction('Suspend User', row) },
            { label: 'Remove User', icon: UserMinus, onClick: () => handleUserAction('Remove User', row) }
          ]}
        />
      )
    }
  ];

  const invitationColumns = [
    { header: 'Name', render: (row) => <span style={{ fontWeight: 500 }}>{row.name}</span> },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', render: (row) => getRoleBadge(row.role) },
    { header: 'Invited By', accessor: 'invitedBy' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', render: (row) => <Badge variant="warning">{row.status}</Badge> },
    { 
      header: 'Actions', 
      render: (row) => (
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="ghost" size="sm" onClick={() => handleResendInvitation(row.email)}>Resend</Button>
          <Button variant="ghost" size="sm" style={{ color: 'var(--danger)' }} onClick={() => handleCancelInvitation(row.id, row.email)}>Cancel</Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 className="page-title">Team Management</h1>
          <p className="page-subtitle">Manage team members, roles, and invitations.</p>
        </div>
        <Button variant="primary" icon={UserPlus} onClick={() => setIsInviteModalOpen(true)} disabled={!canPerformAction('invite_member')} title={getActionDisabledTooltip('invite_member')}>Invite Member</Button>
      </div>

      {!canPerformAction('change_role') && (
        <div style={{
          backgroundColor: 'var(--info-light)',
          border: '1px solid var(--info)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4) var(--space-6)',
          marginBottom: 'var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          color: 'var(--text-primary)',
          fontSize: 'var(--font-sm)'
        }}>
          <Info size={20} color="var(--info)" style={{ flexShrink: 0 }} />
          <span>As a <strong>{currentRole}</strong>, you can invite and manage members, but role assignment and modifications are restricted to the <strong>Owner</strong>.</span>
        </div>
      )}

      {/* Team Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Members</span>
              <Users size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>18</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Available Seats</span>
              <UserCheck size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>7</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Pending Invitations</span>
              <Inbox size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>3</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Departments</span>
              <Briefcase size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>5</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Team Table Card */}
      <Card style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-light)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search team..." 
              className="input-field" 
              style={{ paddingLeft: '32px', width: '100%' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <select className="input-field" style={{ minWidth: '130px' }} value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
              <option value="">Department: All</option>
              <option value="Legal">Legal</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Litigation">Litigation</option>
              <option value="Associates">Associates</option>
              <option value="Corporate">Corporate</option>
              <option value="IT">IT</option>
            </select>
            <select className="input-field" style={{ minWidth: '120px' }} value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="">Role: All</option>
              <option value="Owner">Owner</option>
              <option value="Billing Admin">Billing Admin</option>
              <option value="Team Admin">Team Admin</option>
              <option value="Member">Member</option>
            </select>
            <select className="input-field" style={{ minWidth: '120px' }} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="">Status: All</option>
              <option value="Active">Active</option>
              <option value="Away">Away</option>
              <option value="Offline">Offline</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {filteredMembers.length > 0 ? (
          <Table columns={columns} data={filteredMembers} />
        ) : (
          <EmptyState 
            icon={Users} 
            title="No members found" 
            description="Invite members to collaborate on your organization."
            action={<Button variant="primary" icon={UserPlus} onClick={() => setIsInviteModalOpen(true)}>Invite Member</Button>}
          />
        )}
      </Card>

      {/* Pending Invitations & Department Breakdown Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Pending Invitations */}
        <Card style={{ gridColumn: invitations.length > 0 ? '1 / -1' : 'auto' }}>
          <CardHeader title="Pending Invitations" description="Invitations sent to email addresses that have not yet joined." />
          <CardContent style={{ padding: '0 var(--space-6) var(--space-6)' }}>
            {invitations.length > 0 ? (
              <Table columns={invitationColumns} data={invitations} />
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>
                No pending invitations.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Removed Department Breakdown as requested */}

      </div>

      {/* Invite User Modal */}
      <Modal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
        title="Invite Team Member"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleInviteSubmit}>Send Invitation</Button>
          </>
        }
      >
        <form onSubmit={handleInviteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <Input 
            label="Full Name" 
            placeholder="Alex Williams"
            value={inviteForm.name}
            onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
            required
          />
          <Input 
            label="Email Address" 
            type="email"
            placeholder="alex.williams@pearsonhardman.com"
            value={inviteForm.email}
            onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div className="input-group">
              <label className="input-label">Department</label>
              <select 
                className="input-field"
                value={inviteForm.dept}
                onChange={(e) => setInviteForm({ ...inviteForm, dept: e.target.value })}
              >
                <option value="Legal">Legal</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Litigation">Litigation</option>
                <option value="Associates">Associates</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Assign Role</label>
              <select 
                className="input-field"
                value={inviteForm.role}
                onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
              >
                <option value="Member">Member</option>
                <option value="Team Admin">Team Admin</option>
                <option value="Billing Admin">Billing Admin</option>
              </select>
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--bg)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Allocate Seat immediately</span>
            <Badge variant="success">Available</Badge>
          </div>
        </form>
      </Modal>

      {/* User Details Drawer (Modal styled as a slide-over/details pane) */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="User Details"
        footer={<Button variant="ghost" onClick={() => setSelectedUser(null)}>Close</Button>}
      >
        {selectedUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-4)' }}>
              <Avatar initials={selectedUser.avatar} size="lg" />
              <div>
                <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedUser.name}</h3>
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>{selectedUser.email}</span>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={12}/> Department</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, marginTop: '2px' }}>{selectedUser.department}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><UserCheck size={12}/> Role</div>
                <div style={{ marginTop: '2px' }}>{getRoleBadge(selectedUser.role)}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12}/> Joined Date</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, marginTop: '2px' }}>{selectedUser.joined}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> Last Login</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, marginTop: '2px' }}>{selectedUser.lastLogin}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12}/> Assigned Seat</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, marginTop: '2px' }}>Yes (Seat #12)</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Status</div>
                <div style={{ marginTop: '2px' }}>{getStatusBadge(selectedUser.status)}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
              <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>Recent Activity</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>• Modified workspace settings (Today, 11:20 AM)</div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>• Authorized API Key renewal (Yesterday, 04:15 PM)</div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>• Logged in from Safari / MacOS (Yesterday, 08:30 AM)</div>
              </div>
            </div>
          </div>
        )}
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
