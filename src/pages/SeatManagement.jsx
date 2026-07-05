import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { Avatar } from '../components/ui/Avatar';
import { useRBAC } from '../context/RBACContext';
import { ProgressBar } from '../components/ui/ProgressBar';
import { 
  Users, UserCheck, Inbox, Shield, Repeat, CheckCircle, Plus, Info, Minus
} from 'lucide-react';

const ASSIGNED_USERS = [
  { id: '1', name: 'Jessica Pearson', email: 'jessica.pearson@pearsonhardman.com', avatar: 'JP', department: 'Legal', role: 'Owner (Managing Partner)', seatType: 'Pro', assignedDate: 'Jan 12, 2024', status: 'Active' },
  { id: '2', name: 'Harvey Spector', email: 'harvey.spector@pearsonhardman.com', avatar: 'HS', department: 'Litigation', role: 'Billing Admin (Finance Partner)', seatType: 'Pro', assignedDate: 'Apr 05, 2024', status: 'Active' },
  { id: '3', name: 'Donna Paulsen', email: 'donna.paulsen@pearsonhardman.com', avatar: 'DP', department: 'Operations', role: 'Team Admin (Practice Manager)', seatType: 'Pro', assignedDate: 'Mar 10, 2024', status: 'Active' },
  { id: '4', name: 'Louis Litt', email: 'louis.litt@pearsonhardman.com', avatar: 'LL', department: 'Finance', role: 'Member (Finance Partner)', seatType: 'Pro', assignedDate: 'Feb 15, 2024', status: 'Active' },
  { id: '5', name: 'Mike Ross', email: 'mike.ross@pearsonhardman.com', avatar: 'MR', department: 'Associates', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Jan 22, 2024', status: 'Active' },
  { id: '6', name: 'Rachel Zane', email: 'rachel.zane@pearsonhardman.com', avatar: 'RZ', department: 'Legal', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'May 01, 2024', status: 'Active' },
  { id: '7', name: 'Katrina Bennett', email: 'katrina.bennett@pearsonhardman.com', avatar: 'KB', department: 'Corporate', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Jan 18, 2024', status: 'Active' },
  { id: '8', name: 'Benjamin', email: 'benjamin@pearsonhardman.com', avatar: 'BE', department: 'IT', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Jun 01, 2024', status: 'Active' },
  { id: '9', name: 'Gretchen Bodinski', email: 'gretchen.b@pearsonhardman.com', avatar: 'GB', department: 'Operations', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Feb 20, 2024', status: 'Active' },
  { id: '10', name: 'Samantha Wheeler', email: 'samantha.w@pearsonhardman.com', avatar: 'SW', department: 'Litigation', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Jul 10, 2024', status: 'Active' },
  { id: '11', name: 'Alex Williams', email: 'alex.williams@pearsonhardman.com', avatar: 'AW', department: 'Corporate', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Jul 28, 2025', status: 'Active' },
  { id: '12', name: 'Robert Zane', email: 'robert.zane@pearsonhardman.com', avatar: 'RZ', department: 'Legal', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Jul 29, 2025', status: 'Active' },
  { id: '13', name: 'Dana Scott', email: 'dana.scott@pearsonhardman.com', avatar: 'DS', department: 'Corporate', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Jul 15, 2024', status: 'Active' },
  { id: '14', name: 'Brian Altman', email: 'brian.altman@pearsonhardman.com', avatar: 'BA', department: 'Associates', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Jul 30, 2025', status: 'Active' },
  { id: '15', name: 'Jeff Malone', email: 'jeff.malone@pearsonhardman.com', avatar: 'JM', department: 'Finance', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Aug 05, 2024', status: 'Active' },
  { id: '16', name: 'Harold Gunderson', email: 'harold.gunderson@pearsonhardman.com', avatar: 'HG', department: 'Associates', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Sep 01, 2024', status: 'Active' },
  { id: '17', name: 'Sean Cahill', email: 'sean.cahill@pearsonhardman.com', avatar: 'SC', department: 'Litigation', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Oct 12, 2024', status: 'Active' },
  { id: '18', name: 'Oliver Grady', email: 'oliver.grady@pearsonhardman.com', avatar: 'OG', department: 'Associates', role: 'Member (Associate)', seatType: 'Standard', assignedDate: 'Nov 15, 2024', status: 'Active' }
];

export function SeatManagement() {
  const { currentRole, canPerformAction, getActionDisabledTooltip } = useRBAC();
  const [toast, setToast] = useState(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const [purchasedSeats, setPurchasedSeats] = useState(25);
  const [pendingInvitations, setPendingInvitations] = useState(4);
  const assignedCount = ASSIGNED_USERS.length;

  const availableSeats = purchasedSeats - assignedCount;
  const utilizationPercent = Math.round((assignedCount / purchasedSeats) * 100);
  const pendingPercent = Math.round((pendingInvitations / purchasedSeats) * 100);
  const unassignedSeatsList = Array.from({ length: purchasedSeats - assignedCount }, (_, i) => assignedCount + i + 1);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    setIsTransferModalOpen(false);
    showToast('Seat transfer initiated.', 'success');
  };

  const handlePurchase = () => {
    setPurchasedSeats(prev => prev + purchaseQuantity);
    showToast(`Successfully added ${purchaseQuantity} seats to your organization.`, 'success');
    setPurchaseQuantity(1);
  };

  const openTransferModal = (user) => {
    setSelectedUser(user);
    setIsTransferModalOpen(true);
  };

  const columns = [
    { 
      header: 'User', 
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Avatar initials={row.avatar} size="sm" />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</div>
            <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>{row.email}</div>
          </div>
        </div>
      )
    },
    { header: 'Department', accessor: 'department' },
    { 
      header: 'Role', 
      render: (row) => {
        if (row.role === 'Owner') return <Badge variant="primary">Owner</Badge>;
        if (row.role === 'Billing Admin') return <Badge variant="info">Billing Admin</Badge>;
        if (row.role === 'Team Admin') return <Badge variant="success">Team Admin</Badge>;
        return <Badge variant="default">Member</Badge>;
      } 
    },
    { header: 'Seat Type', accessor: 'seatType' },
    { header: 'Assigned', accessor: 'assignedDate' },
    { header: 'Status', render: (row) => <Badge variant="success">{row.status}</Badge> },
    { 
      header: 'Actions', 
      render: (row) => (
        <Button 
          variant="ghost" 
          size="sm" 
          icon={Repeat} 
          onClick={() => openTransferModal(row)}
          disabled={!canPerformAction('assign_roles')}
          title={getActionDisabledTooltip('assign_roles')}
        >
          Transfer
        </Button>
      )
    }
  ];

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 className="page-title">Seat Management</h1>
          <p className="page-subtitle">Manage purchased seats and assign licenses across your organization.</p>
        </div>
      </div>

      {!canPerformAction('assign_roles') && (
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
          <span>Seat allocations and purchases are restricted. You are viewing this page with read-only access.</span>
        </div>
      )}

      {/* Summary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Purchased Seats</span>
              <Shield size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>{purchasedSeats}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Assigned</span>
              <UserCheck size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>{assignedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Available</span>
              <CheckCircle size={16} color="var(--success)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--success)' }}>{availableSeats}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Pending Invitations</span>
              <Inbox size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>{pendingInvitations}</div>
          </CardContent>
        </Card>
      </div>

      {/* Seat Overview Indicator */}
      <Card style={{ marginBottom: 'var(--space-8)' }}>
        <CardContent style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>Seat Utilization ({utilizationPercent}%)</span>
            <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>{assignedCount} Assigned / {availableSeats} Available</span>
          </div>
          <div style={{ display: 'flex', gap: '4px', height: '12px', width: '100%', borderRadius: 'var(--radius-full)', overflow: 'hidden', backgroundColor: 'var(--border-light)' }}>
            <div style={{ width: `${utilizationPercent}%`, backgroundColor: 'var(--primary)', height: '100%' }} />
            <div style={{ width: `${pendingPercent}%`, backgroundColor: 'var(--warning)', height: '100%', opacity: 0.6 }} title="Pending Invitations" />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--primary)', borderRadius: '2px' }} />
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Assigned</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--warning)', borderRadius: '2px', opacity: 0.6 }} />
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Pending</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--border-light)', borderRadius: '2px' }} />
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Available</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid: Tables and Sidebar actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
        
        {/* Left Column: Tables */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <Card>
            <CardHeader title="Assigned Seats" />
            <Table columns={columns} data={ASSIGNED_USERS} />
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
            <Card>
              <CardHeader title="Unassigned Seats" />
              <CardContent style={{ padding: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {unassignedSeatsList.map((seat, idx) => (
                    <div key={seat} style={{ 
                      padding: 'var(--space-4) var(--space-6)', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      borderBottom: idx !== unassignedSeatsList.length - 1 ? '1px solid var(--border-light)' : 'none'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', fontSize: 'var(--font-xs)', fontWeight: 600 }}>
                          #{seat}
                        </div>
                        <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Empty Seat</span>
                      </div>
                      <Badge variant="default">Available</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              {/* Buy More Seats */}
              <Card>
                <CardHeader title="Buy More Seats" />
                <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Current Cost</span>
                    <span style={{ fontSize: 'var(--font-base)', fontWeight: 600, color: 'var(--text-primary)' }}>₹16,599 / month</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Additional Seat</span>
                    <span style={{ fontSize: 'var(--font-base)', fontWeight: 600, color: 'var(--text-primary)' }}>₹1,249 / month</span>
                  </div>
                  
                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                    <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, display: 'block', marginBottom: 'var(--space-2)' }}>Quantity</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <Button variant="secondary" size="sm" icon={Minus} onClick={() => setPurchaseQuantity(Math.max(1, purchaseQuantity - 1))} />
                      <span style={{ width: '40px', textAlign: 'center', fontWeight: 600 }}>{purchaseQuantity}</span>
                      <Button variant="secondary" size="sm" icon={Plus} onClick={() => setPurchaseQuantity(purchaseQuantity + 1)} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600 }}>Est. New Total</span>
                    <span style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--primary)' }}>₹{(16599 + (purchaseQuantity * 1249)).toLocaleString('en-IN')}</span>
                  </div>

                  <Button 
                    variant="primary" 
                    style={{ width: '100%', marginTop: 'var(--space-2)' }} 
                    onClick={handlePurchase}
                    disabled={!canPerformAction('upgrade_plan')}
                    title={getActionDisabledTooltip('upgrade_plan')}
                  >
                    Purchase Seats
                  </Button>
                </CardContent>
              </Card>

              {/* Seat Activity */}
              <Card>
                <CardHeader title="Seat Activity" />
                <CardContent style={{ padding: 'var(--space-6)' }}>
                  <div style={{ position: 'relative', paddingLeft: 'var(--space-6)' }}>
                    <div style={{ position: 'absolute', left: '7px', top: '0', bottom: '0', width: '2px', backgroundColor: 'var(--border-light)' }} />
                    
                    {[
                      { icon: Shield, color: 'var(--primary)', title: 'Purchased 5 Seats', date: 'Jul 15, 2025' },
                      { icon: UserCheck, color: 'var(--success)', title: 'Assigned Seat to Emma', date: 'Jul 10, 2025' },
                      { icon: Repeat, color: 'var(--info)', title: 'Transferred Seat to Alex', date: 'Jun 28, 2025' },
                    ].map((activity, i) => (
                      <div key={i} style={{ position: 'relative', marginBottom: i !== 2 ? 'var(--space-6)' : 0 }}>
                        <div style={{ position: 'absolute', left: '-30px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--surface)', border: `2px solid ${activity.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        </div>
                        <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>{activity.title}</div>
                        <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>{activity.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Transfer Modal */}
      <Modal isOpen={isTransferModalOpen} onClose={() => setIsTransferModalOpen(false)} title="Transfer Seat">
        <form onSubmit={handleTransfer} style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
            You are transferring the seat currently held by <strong>{selectedUser?.name}</strong>. They will immediately lose access to premium features.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <label className="input-label">New User Email</label>
            <input type="email" className="input-field" placeholder="employee@pearsonhardman.com" required />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <label className="input-label">Reason for Transfer</label>
            <select className="input-field" required>
              <option value="">Select a reason</option>
              <option value="role_change">Role Change</option>
              <option value="offboarding">Employee Offboarding</option>
              <option value="temporary">Temporary Reassignment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
            <Button variant="ghost" type="button" onClick={() => setIsTransferModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Transfer Seat</Button>
          </div>
        </form>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
