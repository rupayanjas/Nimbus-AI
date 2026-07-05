import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useRBAC } from '../context/RBACContext';
import { 
  BarChart3, Database, Zap, Users, 
  AlertTriangle, Lightbulb, CheckCircle, Info 
} from 'lucide-react';

export function Usage() {
  const { currentRole } = useRBAC();

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 className="page-title">Usage & Resource Analytics</h1>
          <p className="page-subtitle">Monitor your organization's AI resource consumption and subscription limits.</p>
        </div>
      </div>

      {/* Top Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>AI Credits</span>
              <BarChart3 size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>620K</span>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>/ 1M</span>
            </div>
            <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--primary)' }}>62% Used</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Storage</span>
              <Database size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>58 GB</span>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>/ 100 GB</span>
            </div>
            <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--primary)' }}>58% Used</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>API Requests</span>
              <Zap size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>22,184</span>
            </div>
            <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Monthly Limit: 50,000</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Seat Usage</span>
              <Users size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>18</span>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>/ 25</span>
            </div>
            <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--primary)' }}>72% Used</div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Utilization */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        
        <Card>
          <CardHeader title="AI Credits" />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Usage Progress</span>
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>620K / 1M</span>
              </div>
              <ProgressBar value={62} color="var(--primary)" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Remaining Credits</div>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>380K</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Est. Days Remaining</div>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>18 Days</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Storage" />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Storage Capacity</span>
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>58 GB / 100 GB</span>
              </div>
              <ProgressBar value={58} color="var(--info)" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Used</div>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>58 GB</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Remaining</div>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>42 GB</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="API Usage" />
          <CardContent style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Daily Requests</div>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>1,452</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Peak Usage</div>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>3,210 <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', fontWeight: 400 }}>(Aug 2)</span></div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Average Usage</div>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>950 / day</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Monthly Forecast</div>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>28,500</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Seats" />
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Seat Allocation</span>
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>18 / 25</span>
              </div>
              <ProgressBar value={72} color="var(--success)" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Purchased</div>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>25</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Used</div>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>18</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Available</div>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: 600, color: 'var(--success)' }}>7</div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Monthly Usage & Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        
        {/* Simple CSS Visualization for Monthly Usage */}
        <Card>
          <CardHeader title="Monthly Usage Trend" />
          <CardContent style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', height: '200px', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              {[
                { month: 'Mar', ai: 30, storage: 40, api: 25 },
                { month: 'Apr', ai: 45, storage: 45, api: 40 },
                { month: 'May', ai: 60, storage: 50, api: 55 },
                { month: 'Jun', ai: 55, storage: 52, api: 60 },
                { month: 'Jul', ai: 75, storage: 55, api: 80 },
                { month: 'Aug', ai: 62, storage: 58, api: 70 },
              ].map((data, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ flex: 1, display: 'flex', gap: '4px', alignItems: 'flex-end', width: '100%', justifyContent: 'center' }}>
                    <div style={{ width: '12px', backgroundColor: 'var(--primary)', height: `${data.ai}%`, borderRadius: '4px 4px 0 0' }} title={`AI Credits: ${data.ai}%`} />
                    <div style={{ width: '12px', backgroundColor: 'var(--info)', height: `${data.storage}%`, borderRadius: '4px 4px 0 0' }} title={`Storage: ${data.storage}%`} />
                    <div style={{ width: '12px', backgroundColor: 'var(--warning)', height: `${data.api}%`, borderRadius: '4px 4px 0 0' }} title={`API Calls: ${data.api}%`} />
                  </div>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>{data.month}</span>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-6)', marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--primary)', borderRadius: '2px' }} />
                <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>AI Credits</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--info)', borderRadius: '2px' }} />
                <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Storage</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--warning)', borderRadius: '2px' }} />
                <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>API Calls</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Optimization */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Card>
            <CardHeader title="Usage Alerts" />
            <CardContent style={{ padding: '0' }}>
              <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: 'var(--space-3)' }}>
                <AlertTriangle size={20} color="var(--warning)" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>AI Credit usage exceeds 60%</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>Consider upgrading your plan if current consumption pace continues.</div>
                </div>
              </div>
              <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: 'var(--space-3)' }}>
                <Info size={20} color="var(--info)" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Storage approaching limit</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>Delete old assets or increase storage capacity.</div>
                </div>
              </div>
              <div style={{ padding: 'var(--space-4) var(--space-6)', display: 'flex', gap: 'var(--space-3)' }}>
                <CheckCircle size={20} color="var(--success)" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Unused seats available</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>You have 7 available seats you can assign to new team members.</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Optimization Tips" />
            <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <Lightbulb size={18} color="var(--warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Upgrade to Enterprise for unlimited AI credits.</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <Lightbulb size={18} color="var(--warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Archive inactive projects to save storage.</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <Lightbulb size={18} color="var(--warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Remove unused members or purchase additional seats.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </div>
  );
}
