import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { useRBAC } from '../context/RBACContext';
import { 
  Building, Palette, Bell, Shield, CreditCard, Database, Server, Info, AlertTriangle 
} from 'lucide-react';

// A simple inline Toggle component since we don't have one in the UI library
const Toggle = ({ label, checked, onChange, disabled }) => (
  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}>
    <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{label}</span>
    <div style={{ position: 'relative', width: '36px', height: '20px' }}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        disabled={disabled}
        style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
      />
      <span style={{
        position: 'absolute', cursor: disabled ? 'not-allowed' : 'pointer', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: checked ? 'var(--primary)' : 'var(--border)',
        transition: '.4s',
        borderRadius: '34px'
      }}>
        <span style={{
          position: 'absolute', content: '""', height: '16px', width: '16px', left: '2px', bottom: '2px',
          backgroundColor: 'white',
          transition: '.4s',
          borderRadius: '50%',
          transform: checked ? 'translateX(16px)' : 'translateX(0)'
        }} />
      </span>
    </div>
  </label>
);

export function Settings() {
  const { currentRole, canPerformAction, getActionDisabledTooltip } = useRBAC();
  const [toast, setToast] = useState(null);

  const [toggles, setToggles] = useState({
    emailNotif: true,
    invoiceEmails: true,
    securityAlerts: true,
    weeklyReports: false,
    productUpdates: true,
    require2fa: false,
    apiToken: true,
    autoRenewal: true
  });

  const handleToggle = (key) => {
    if (!canPerformAction('modify_settings')) {
      showToast('You do not have permission to modify settings.', 'error');
      return;
    }
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleAction = (actionName) => {
    showToast(`${actionName} action triggered.`, 'success');
  };

  const isSettingsDisabled = !canPerformAction('modify_settings');
  const disabledTooltip = getActionDisabledTooltip('modify_settings');

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 className="page-title">Organization Settings</h1>
          <p className="page-subtitle">Manage your organization preferences and account configuration.</p>
        </div>
      </div>

      {isSettingsDisabled && (
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
          <span>Organization settings modifications are restricted. You are viewing this page with read-only access.</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        
        {/* Organization Profile */}
        <Card>
          <CardHeader title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Building size={18} /> Organization Profile
            </div>
          } />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Organization Name</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Pearson Hardman</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Industry</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Legal Services</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Website</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>pearsonhardman.com</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Workspace ID</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>ORG-10293</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', paddingBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Created</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>March 2023</span>
            </div>
            <Button variant="secondary" onClick={() => handleAction('Edit Organization')} disabled={isSettingsDisabled} title={disabledTooltip}>Edit Organization</Button>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card>
          <CardHeader title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Palette size={18} /> Branding
            </div>
          } />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Company Logo</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>logo_pearsonhardman.png</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Primary Color</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: '#3b82f6' }} />
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>#3b82f6</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Accent Color</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: '#10b981' }} />
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>#10b981</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Brand Name</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Pearson Hardman</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', paddingBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Custom Domain</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>app.pearsonhardman.com</span>
            </div>
            <Button variant="secondary" onClick={() => handleAction('Save Branding')} disabled={isSettingsDisabled} title={disabledTooltip}>Save Branding</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Bell size={18} /> Notifications
            </div>
          } />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <Toggle label="Email Notifications" checked={toggles.emailNotif} onChange={() => handleToggle('emailNotif')} disabled={isSettingsDisabled} />
            <Toggle label="Invoice Emails" checked={toggles.invoiceEmails} onChange={() => handleToggle('invoiceEmails')} disabled={isSettingsDisabled} />
            <Toggle label="Security Alerts" checked={toggles.securityAlerts} onChange={() => handleToggle('securityAlerts')} disabled={isSettingsDisabled} />
            <Toggle label="Weekly Reports" checked={toggles.weeklyReports} onChange={() => handleToggle('weeklyReports')} disabled={isSettingsDisabled} />
            <Toggle label="Product Updates" checked={toggles.productUpdates} onChange={() => handleToggle('productUpdates')} disabled={isSettingsDisabled} />
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Shield size={18} /> Security
            </div>
          } />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Toggle label="Require Two-Factor Authentication" checked={toggles.require2fa} onChange={() => handleToggle('require2fa')} disabled={isSettingsDisabled} />
            <Toggle label="API Token Access" checked={toggles.apiToken} onChange={() => handleToggle('apiToken')} disabled={isSettingsDisabled} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Session Timeout</span>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>12 Hours</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Password Policy</span>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Strong (12+ chars)</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Active Sessions</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>3 Active Sessions globally</span>
            </div>
            
            <Button variant="secondary" onClick={() => handleAction('Manage Security')} disabled={isSettingsDisabled} title={disabledTooltip} style={{ marginTop: 'var(--space-2)' }}>Manage Security</Button>
          </CardContent>
        </Card>

        {/* Billing Preferences */}
        <Card>
          <CardHeader title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <CreditCard size={18} /> Billing Preferences
            </div>
          } />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Currency</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>INR</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Time Zone</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Asia/Kolkata</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Invoice Language</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>English</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Tax Region</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Maharashtra</span>
            </div>
            
            <Toggle label="Auto Renewal" checked={toggles.autoRenewal} onChange={() => handleToggle('autoRenewal')} disabled={isSettingsDisabled} />
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card>
          <CardHeader title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Database size={18} /> Data & Privacy
            </div>
          } />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Button variant="secondary" onClick={() => handleAction('Export Data')} disabled={isSettingsDisabled} title={disabledTooltip}>Export Organization Data</Button>
            <Button variant="secondary" onClick={() => handleAction('Download Logs')} disabled={isSettingsDisabled} title={disabledTooltip}>Download Audit Logs</Button>
            <Button variant="secondary" onClick={() => handleAction('Privacy Settings')} disabled={isSettingsDisabled} title={disabledTooltip}>Privacy Settings</Button>
            
            <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--danger-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)', color: 'var(--danger)' }}>
                <AlertTriangle size={16} /> <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600 }}>Danger Zone</span>
              </div>
              <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                Deleting your organization will permanently erase all data, projects, and active subscriptions.
              </p>
              <Button variant="danger" disabled={true} title="Organization deletion is disabled in this environment.">
                Delete Organization
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Server size={18} /> System Information
            </div>
          } />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Current Plan</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--primary)' }}>Growth</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Application Version</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>1.0.0</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Workspace ID</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>ORG-10293</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Environment</span>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--success)' }}>Production Demo</span>
            </div>
          </CardContent>
        </Card>

      </div>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
