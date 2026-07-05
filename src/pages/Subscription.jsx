import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Table } from '../components/ui/Table';
import { Avatar } from '../components/ui/Avatar';
import { Toast } from '../components/ui/Toast';
import { useRBAC } from '../context/RBACContext';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, CreditCard, Calendar, Check, X, 
  ArrowUpRight, AlertCircle, History, FileText, Settings, Shield, Info
} from 'lucide-react';

export function Subscription() {
  const { canPerformAction, getActionDisabledTooltip } = useRBAC();
  const navigate = useNavigate();
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const comparisonData = [
    { feature: 'Users', free: '1', starter: '5', growth: '25', enterprise: 'Unlimited' },
    { feature: 'AI Credits', free: '5K', starter: '100K', growth: '1M', enterprise: 'Unlimited' },
    { feature: 'Storage', free: '1 GB', starter: '10 GB', growth: '100 GB', enterprise: 'Unlimited' },
    { feature: 'API Access', free: false, starter: true, growth: true, enterprise: true },
    { feature: 'Priority Support', free: false, starter: false, growth: true, enterprise: true },
    { feature: 'Analytics', free: false, starter: false, growth: true, enterprise: true },
    { feature: 'SSO', free: false, starter: false, growth: false, enterprise: true },
    { feature: 'Audit Logs', free: false, starter: false, growth: false, enterprise: true },
    { feature: 'Custom Branding', free: false, starter: false, growth: false, enterprise: true },
  ];

  const comparisonColumns = [
    { header: 'Feature', render: (row) => <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.feature}</span> },
    { header: 'Free', render: (row) => typeof row.free === 'boolean' ? (row.free ? <Check size={16} color="var(--success)" /> : <X size={16} color="var(--text-tertiary)" />) : <span>{row.free}</span> },
    { header: 'Starter', render: (row) => typeof row.starter === 'boolean' ? (row.starter ? <Check size={16} color="var(--success)" /> : <X size={16} color="var(--text-tertiary)" />) : <span>{row.starter}</span> },
    { header: 'Growth', render: (row) => typeof row.growth === 'boolean' ? (row.growth ? <Check size={16} color="var(--primary)" /> : <X size={16} color="var(--text-tertiary)" />) : <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{row.growth}</span> },
    { header: 'Enterprise', render: (row) => typeof row.enterprise === 'boolean' ? (row.enterprise ? <Check size={16} color="var(--success)" /> : <X size={16} color="var(--text-tertiary)" />) : <span>{row.enterprise}</span> },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Subscription & Billing</h1>
        <p className="page-subtitle">Manage subscription, billing cycle, and feature access.</p>
      </div>

      {!canPerformAction('upgrade_plan') && (
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
          <span>Certain subscription management actions (like upgrading or cancelling) are restricted to the <strong>Owner</strong> role. You have read-only access to this page.</span>
        </div>
      )}

      {/* Current Subscription & Payment Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
        
        {/* Current Subscription */}
        <Card style={{ gridColumn: '1 / -1' }}>
          <CardContent style={{ padding: 'var(--space-8)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-6)' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Current Plan</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--text-primary)' }}>Growth</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Monthly Price</div>
                    <div style={{ fontSize: 'var(--font-base)', fontWeight: 500, color: 'var(--text-primary)' }}>₹16,599/month</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Billing Cycle</div>
                    <div style={{ fontSize: 'var(--font-base)', fontWeight: 500, color: 'var(--text-primary)' }}>{billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Renewal Date</div>
                    <div style={{ fontSize: 'var(--font-base)', fontWeight: 500, color: 'var(--text-primary)' }}>August 12, 2025</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Auto Renewal</div>
                    <div style={{ fontSize: 'var(--font-base)', fontWeight: 500, color: 'var(--text-primary)' }}>Enabled</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Payment Method</div>
                    <div style={{ fontSize: 'var(--font-base)', fontWeight: 500, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CreditCard size={16} color="var(--text-secondary)" /> Visa **** 4567
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Billing Contact</div>
                    <div style={{ fontSize: 'var(--font-base)', fontWeight: 500, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Avatar initials="JP" size="sm" style={{ width: '24px', height: '24px', fontSize: '10px' }} /> Jessica Pearson
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', minWidth: '200px' }}>
                <Button variant="primary" icon={ArrowUpRight} onClick={() => setIsContactSalesModalOpen(true)} disabled={!canPerformAction('upgrade_plan')} title={getActionDisabledTooltip('upgrade_plan')}>Upgrade Plan</Button>
                <Button variant="ghost" style={{ color: 'var(--danger)' }} icon={AlertCircle} onClick={() => showToast('Subscription cancellation requested. Our team will contact you shortly.', 'warning')} disabled={!canPerformAction('cancel_subscription')} title={getActionDisabledTooltip('cancel_subscription')}>Cancel Subscription</Button>
              </div>

            </div>
          </CardContent>
        </Card>

      </div>

      {/* Plan Comparison Section */}
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-6)' }}>
          <div>
            <h2 style={{ fontSize: 'var(--font-xl)', fontWeight: 600, color: 'var(--text-primary)' }}>Plan Comparison</h2>
            <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginTop: '4px' }}>Find the right plan for your team's needs.</p>
          </div>
          
          {/* Billing Cycle Toggle */}
          <div style={{ display: 'flex', backgroundColor: 'var(--surface)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <button 
              style={{ 
                padding: 'var(--space-2) var(--space-4)', 
                fontSize: 'var(--font-sm)', 
                fontWeight: 500,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: billingCycle === 'monthly' ? 'var(--primary-light)' : 'transparent',
                color: billingCycle === 'monthly' ? 'var(--primary)' : 'var(--text-secondary)',
              }}
              onClick={() => { setBillingCycle('monthly'); showToast('Switched to monthly billing pricing.', 'info'); }}
            >
              Monthly Billing
            </button>
            <button 
              style={{ 
                padding: 'var(--space-2) var(--space-4)', 
                fontSize: 'var(--font-sm)', 
                fontWeight: 500,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: billingCycle === 'yearly' ? 'var(--primary-light)' : 'transparent',
                color: billingCycle === 'yearly' ? 'var(--primary)' : 'var(--text-secondary)',
              }}
              onClick={() => { setBillingCycle('yearly'); showToast('Switched to yearly billing pricing.', 'info'); }}
            >
              Yearly Billing <span style={{ color: 'var(--success)', fontSize: '11px', marginLeft: '4px' }}>Save 20%</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)' }}>
          
          {/* Free Plan */}
          <Card>
            <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>Free</h3>
                <div style={{ marginTop: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--text-primary)' }}>₹0</span>
                  <span style={{ color: 'var(--text-secondary)' }}>/month</span>
                </div>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1, marginBottom: 'var(--space-6)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> 1 User</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> 5K AI Credits</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> Community Support</li>
              </ul>
              <Button variant="secondary" style={{ width: '100%' }} onClick={() => showToast('Plan change requested. Our team will contact you shortly.', 'info')}>Switch Plan</Button>
            </CardContent>
          </Card>

          {/* Starter Plan */}
          <Card>
            <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>Starter</h3>
                <div style={{ marginTop: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--text-primary)' }}>₹{billingCycle === 'yearly' ? '3,249' : '4,079'}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>/month</span>
                </div>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1, marginBottom: 'var(--space-6)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> 5 Users</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> 100K AI Credits</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> Email Support</li>
              </ul>
              <Button variant="secondary" style={{ width: '100%' }} onClick={() => showToast('Plan change requested. Our team will contact you shortly.', 'info')} disabled={!canPerformAction('upgrade_plan')} title={getActionDisabledTooltip('upgrade_plan')}>Switch Plan</Button>
            </CardContent>
          </Card>

          {/* Growth Plan (Current) */}
          <Card style={{ borderColor: 'var(--primary)', boxShadow: '0 0 0 1px var(--primary)' }}>
            <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              
              <div style={{ marginBottom: 'var(--space-6)', marginTop: 'var(--space-2)' }}>
                <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>Growth</h3>
                <div style={{ marginTop: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--text-primary)' }}>₹{billingCycle === 'yearly' ? '13,249' : '16,599'}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>/month</span>
                </div>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1, marginBottom: 'var(--space-6)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--primary)" /> <strong style={{ color: 'var(--text-primary)' }}>25 Users</strong></li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--primary)" /> <strong style={{ color: 'var(--text-primary)' }}>1M AI Credits</strong></li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> Priority Support</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> Analytics</li>
              </ul>
              <Button variant="primary" disabled style={{ width: '100%' }}>Current Plan</Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card>
            <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>Enterprise</h3>
                <div style={{ marginTop: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--text-primary)' }}>Custom</span>
                  <span style={{ color: 'var(--text-secondary)' }}> Pricing</span>
                </div>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1, marginBottom: 'var(--space-6)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> Unlimited Users</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> Unlimited AI Credits</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> Dedicated Support</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={16} color="var(--success)" /> Custom Integrations</li>
              </ul>
              <Button variant="secondary" style={{ width: '100%' }} onClick={() => setIsContactSalesModalOpen(true)} disabled={!canPerformAction('upgrade_plan')} title={getActionDisabledTooltip('upgrade_plan')}>Upgrade Plan</Button>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Feature Comparison Table */}
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>Compare Features</h2>
        <Card>
          <Table columns={comparisonColumns} data={comparisonData} />
        </Card>
      </div>

      {/* Timeline & Payment Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Subscription Timeline */}
        <Card>
          <CardHeader title="Subscription History" />
          <CardContent style={{ padding: 'var(--space-6)' }}>
            <div style={{ position: 'relative', paddingLeft: 'var(--space-6)' }}>
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border)' }}></div>
              
              <div style={{ position: 'relative', marginBottom: 'var(--space-6)' }}>
                <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--surface)' }}></div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Next Renewal</div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>August 12, 2025</div>
              </div>

              <div style={{ position: 'relative', marginBottom: 'var(--space-6)' }}>
                <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--border-light)', border: '2px solid var(--surface)' }}></div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Upgraded to Growth</div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>March 15, 2025</div>
              </div>

              <div style={{ position: 'relative', marginBottom: 'var(--space-6)' }}>
                <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--border-light)', border: '2px solid var(--surface)' }}></div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Upgraded to Starter</div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>November 02, 2024</div>
              </div>

              <div style={{ position: 'relative', marginBottom: 'var(--space-6)' }}>
                <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--border-light)', border: '2px solid var(--surface)' }}></div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Free Trial Started</div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>October 18, 2024</div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--border-light)', border: '2px solid var(--surface)' }}></div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Organization Created</div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>October 18, 2024</div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader title="Next Payment" />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 'var(--space-4)', borderBottom: '1px dashed var(--border)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Due Date</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>August 12, 2025</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Growth Plan (Monthly)</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>₹16,599</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Estimated Tax</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>₹1,330</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
              <span style={{ fontSize: 'var(--font-base)', fontWeight: 600, color: 'var(--text-primary)' }}>Estimated Total</span>
              <span style={{ fontSize: 'var(--font-xl)', fontWeight: 700, color: 'var(--primary)' }}>₹17,929</span>
            </div>

          </CardContent>
          <CardFooter>
            <Button variant="secondary" style={{ width: '100%' }} icon={FileText} onClick={() => navigate('/invoices')}>View Invoice History</Button>
          </CardFooter>
        </Card>

      </div>



      {/* Contact Sales Modal */}
      <Modal 
        isOpen={isContactSalesModalOpen} 
        onClose={() => setIsContactSalesModalOpen(false)} 
        title="Contact Sales"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsContactSalesModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setIsContactSalesModalOpen(false); window.location.href = 'mailto:sales@pearson.hardman.com'; }}>Contact Sales</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            To upgrade to the Enterprise plan, please contact our sales team to discuss custom pricing, advanced requirements, and dedicated support options tailored to your organization.
          </p>
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-hover)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <Shield size={20} color="var(--primary)" />
             <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>Enterprise-Grade Security & Compliance</span>
          </div>
        </div>
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
