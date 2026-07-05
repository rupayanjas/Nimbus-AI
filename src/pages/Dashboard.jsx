import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Avatar } from '../components/ui/Avatar';
import { useRBAC } from '../context/RBACContext';
import { 
  Zap, CreditCard, Users, BarChart3, 
  ArrowUpRight, Download, UserPlus, Plus, CheckCircle, Info
} from 'lucide-react';

export function Dashboard() {
  const { currentRole, canPerformAction, getActionDisabledTooltip } = useRBAC();
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of subscription, billing, and resource utilization.</p>
      </div>

      {currentRole === 'Member' && (
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
          <span>You are viewing the dashboard as a <strong>Member</strong>. All actions and configurations are read-only.</span>
        </div>
      )}

      {/* Top KPI Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        
        {/* 1. Current Plan */}
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Current Plan</span>
              <Zap size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>Growth</span>
              <Badge variant="success">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* 2. Monthly Cost */}
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Monthly Cost</span>
              <CreditCard size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>
              ₹16,599<span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 400 }}>/month</span>
            </div>
            <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
              Next Billing: August 12, 2025
            </div>
          </CardContent>
        </Card>

        {/* 3. Seats */}
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Seats</span>
              <Users size={16} color="var(--text-tertiary)" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>18 <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 400 }}>/ 25 Used</span></span>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>72%</span>
              </div>
              <ProgressBar value={72} color="var(--primary)" />
            </div>
          </CardContent>
        </Card>

        {/* 4. AI Credits */}
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>AI Credits</span>
              <BarChart3 size={16} color="var(--text-tertiary)" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>620K <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 400 }}>/ 1M</span></span>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>62%</span>
              </div>
              <ProgressBar value={62} color="var(--primary)" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        
        {/* Subscription Overview Card */}
        <Card style={{ display: 'flex', flexDirection: 'column' }}>
          <CardHeader title="Subscription Overview" />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', flex: 1 }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Plan</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Growth</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Billing Cycle</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Monthly</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Renewal Date</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>August 12, 2025</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Payment Method</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CreditCard size={14} color="var(--text-secondary)" /> Visa **** 4567
                </div>
              </div>
            </div>

            <Button variant="secondary" onClick={() => navigate('/subscription')} style={{ width: '100%', marginTop: 'var(--space-6)' }}>View Subscription</Button>
          </CardContent>
        </Card>

        {/* Usage Summary Card */}
        <Card>
          <CardHeader title="Usage Summary" />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>AI Credits Used</span>
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>620K / 1M</span>
              </div>
              <ProgressBar value={62} color="var(--primary)" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Storage</span>
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>58 GB / 100 GB</span>
              </div>
              <ProgressBar value={58} color="var(--info)" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>API Calls</span>
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>22,184</span>
              </div>
              <ProgressBar value={44} color="var(--warning)" />
            </div>

          </CardContent>
        </Card>

      </div>

      {/* Third Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        
        {/* Recent Activity Card */}
        <Card>
          <CardHeader title="Recent Activity" />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <Avatar initials="JP" size="md" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-primary)' }}>
                  <span style={{ fontWeight: 600 }}>Jessica</span> upgraded the plan
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowUpRight size={12} /> 2 hours ago
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <Avatar initials="LL" size="md" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-primary)' }}>
                  <span style={{ fontWeight: 600 }}>Louis</span> downloaded Invoice #INV-1042
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Download size={12} /> Yesterday
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <Avatar initials="DP" size="md" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-primary)' }}>
                  <span style={{ fontWeight: 600 }}>Donna</span> purchased 5 seats
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <UserPlus size={12} /> Aug 1, 2025
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <Avatar initials="HS" size="md" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-primary)' }}>
                  <span style={{ fontWeight: 600 }}>Harvey</span> joined the organization
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <UserPlus size={12} /> Jul 28, 2025
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <div className="avatar avatar-md" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
                <CheckCircle size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-primary)' }}>
                  Payment processed successfully
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CreditCard size={12} /> Jul 12, 2025
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Quick Actions & Spending */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* Quick Actions Card */}
          <Card>
            <CardHeader title="Quick Actions" />
            <CardContent style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <Button variant="primary" icon={ArrowUpRight} onClick={() => navigate('/subscription')} style={{ justifyContent: 'flex-start' }} disabled={!canPerformAction('upgrade_plan')} title={getActionDisabledTooltip('upgrade_plan')}>Upgrade Plan</Button>
                <Button variant="secondary" icon={Download} onClick={() => navigate('/invoices')} style={{ justifyContent: 'flex-start' }} disabled={!canPerformAction('download_invoice')} title={getActionDisabledTooltip('download_invoice')}>Download Invoice</Button>
                <Button variant="secondary" icon={UserPlus} onClick={() => navigate('/team')} style={{ justifyContent: 'flex-start' }} disabled={!canPerformAction('invite_member')} title={getActionDisabledTooltip('invite_member')}>Invite Member</Button>
                <Button variant="secondary" icon={Plus} onClick={() => navigate('/seat-management')} style={{ justifyContent: 'flex-start' }} disabled={!canPerformAction('invite_member')} title={getActionDisabledTooltip('invite_member')}>Buy Seats</Button>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Spending Placeholder */}
          <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardHeader title="Monthly Spending" />
            <CardContent style={{ padding: 'var(--space-6)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', marginTop: 'var(--space-2)' }}>
                {[
                  { month: 'Jan', val: 9990 },
                  { month: 'Feb', val: 9990 },
                  { month: 'Mar', val: 13300 },
                  { month: 'Apr', val: 16599 },
                  { month: 'May', val: 16599 },
                  { month: 'Jun', val: 16599 },
                  { month: 'Jul', val: 16599 },
                  { month: 'Aug', val: 16599 },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '10%' }}>
                    <div style={{ 
                      width: '100%', 
                      height: `${(item.val / 17000) * 110}px`, 
                      backgroundColor: 'var(--primary)', 
                      borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                      opacity: item.month === 'Aug' ? 1 : 0.4,
                      transition: 'opacity 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => e.target.style.opacity = '1'}
                    onMouseOut={(e) => e.target.style.opacity = item.month === 'Aug' ? '1' : '0.4'}
                    ></div>
                    <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{item.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
