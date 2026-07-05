import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Home, Moon, Sun, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRBAC } from '../../context/RBACContext';
import { MOCK_ORGANIZATION, MOCK_USERS } from '../../lib/mockData';
import { Modal } from '../ui/Modal';
import { Card, CardContent } from '../ui/Card';

export function TopNav() {
  const { currentUser } = useRBAC();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notificationsRef = useRef(null);

  const mockNotifications = [
    { id: 1, text: "Invoice INV-1042 was paid successfully.", date: "Today" },
    { id: 2, text: "Seat assigned to Rachel Zane.", date: "Yesterday" },
    { id: 3, text: "Organization profile updated.", date: "Aug 12" }
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen]);

  const searchablePages = [
    { label: 'Dashboard', path: '/dashboard', category: 'Pages' },
    { label: 'Subscription', path: '/subscription', category: 'Pages' },
    { label: 'Usage & Resource Analytics', path: '/usage', category: 'Pages' },
    { label: 'Invoices & Billing History', path: '/invoices', category: 'Pages' },
    { label: 'Payment Methods & Billing Preferences', path: '/payment-methods', category: 'Pages' },
    { label: 'Seat Management', path: '/seat-management', category: 'Pages' },
    { label: 'Team Members', path: '/team', category: 'Pages' },
    { label: 'Roles & Permissions (RBAC)', path: '/roles', category: 'Pages' },
    { label: 'Audit Security Log', path: '/audit-log', category: 'Pages' },
    { label: 'Organization Settings', path: '/settings', category: 'Pages' },
  ];

  const searchableMembers = MOCK_USERS.map(user => ({
    label: `${user.name} (${user.role})`,
    path: `/team`,
    category: 'Team Members'
  }));

  const allSearchable = [...searchablePages, ...searchableMembers];
  const filteredResults = searchQuery 
    ? allSearchable.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <header className="topnav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 var(--space-6)', backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        
        {/* Left Side: Org Info */}
        <div className="topnav-left" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '250px' }}>
          <div className="topnav-org-name" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{MOCK_ORGANIZATION.name}</div>
          <span style={{ fontSize: 'var(--font-xs)', padding: '2px 8px', backgroundColor: 'var(--border-light)', borderRadius: 'var(--radius-full)', color: 'var(--text-secondary)' }}>
            {MOCK_ORGANIZATION.plan.name}
          </span>
        </div>

        {/* Center: Search (Spotify Style) */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <button 
            onClick={() => setIsSearchOpen(true)}
            style={{ 
              position: 'relative', display: 'flex', alignItems: 'center', 
              width: '400px', height: '40px', backgroundColor: 'var(--surface-hover)', 
              borderRadius: '24px', border: '1px solid transparent', cursor: 'text', padding: '0 16px',
              transition: 'var(--transition-fast)', color: 'var(--text-secondary)'
            }}
          >
            <Search size={18} style={{ marginRight: '12px' }} />
            <span style={{ fontSize: 'var(--font-sm)' }}>What do you want to find?</span>
            <div style={{ position: 'absolute', right: '16px', display: 'flex', gap: '4px' }}>
              <kbd style={{ backgroundColor: 'var(--surface)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', border: '1px solid var(--border)' }}>⌘</kbd>
              <kbd style={{ backgroundColor: 'var(--surface)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', border: '1px solid var(--border)' }}>K</kbd>
            </div>
          </button>
        </div>

        {/* Right Side: Night Mode & Notifications (No Avatar) */}
        <div className="topnav-right" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', width: '250px', justifyContent: 'flex-end' }}>
          <button 
            onClick={toggleTheme}
            style={{ color: 'var(--text-secondary)', padding: '4px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center' }}
            title="Toggle Night Mode"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div style={{ position: 'relative' }} ref={notificationsRef}>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              style={{ color: 'var(--text-secondary)', padding: '4px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center' }}
            >
              <Bell size={20} />
              <span style={{ position: 'absolute', top: 0, right: '2px', width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%' }}></span>
            </button>
            
            {/* Notification Dropdown */}
            {isNotificationsOpen && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, marginTop: '12px',
                width: '320px', backgroundColor: 'var(--surface)', 
                border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', 
                boxShadow: 'var(--shadow-lg)', zIndex: 50, overflow: 'hidden'
              }}>
                <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Notifications
                </div>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {mockNotifications.map(notif => (
                    <div key={notif.id} style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-primary)' }}>{notif.text}</span>
                      <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>{notif.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spotify-Style Centered Search Overlay */}
      {isSearchOpen && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', flexDirection: 'column',
          alignItems: 'center', paddingTop: '10vh'
        }} onClick={(e) => { if (e.target === e.currentTarget) setIsSearchOpen(false); }}>
          <div style={{
            width: '600px', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', padding: '0 24px',
            height: '64px'
          }}>
            <Search size={24} style={{ color: 'var(--text-primary)', marginRight: '16px' }} />
            <input 
              autoFocus
              type="text" 
              placeholder="What do you want to find?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1, height: '100%', border: 'none', backgroundColor: 'transparent',
                fontSize: 'var(--font-lg)', color: 'var(--text-primary)', outline: 'none'
              }}
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              style={{ padding: '8px', cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}
            >
              <X size={24} />
            </button>
          </div>
          {searchQuery && (
            <div style={{
              width: '600px', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)',
              marginTop: '16px', padding: '16px', boxShadow: 'var(--shadow-lg)',
              maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px'
            }}>
              {filteredResults.length > 0 ? (
                filteredResults.map((result, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                      navigate(result.path);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    style={{
                      padding: '12px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      transition: 'background-color 0.2s', backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 'var(--font-sm)' }}>{result.label}</span>
                    <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', backgroundColor: 'var(--border-light)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>{result.category}</span>
                  </div>
                ))
              ) : (
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)', padding: '8px' }}>
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Home Button Modal */}
      <Modal isOpen={isHomeOpen} onClose={() => setIsHomeOpen(false)} title="Nimbus AI Enterprise Platform">
        <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--font-base)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            Nimbus AI is an enterprise AI writing platform that helps organizations create, collaborate, and manage content at scale. From marketing campaigns and business proposals to customer communications and documentation, teams can leverage AI to work faster while maintaining consistency, security, and control.
          </p>
          <Card style={{ backgroundColor: 'var(--surface-hover)', border: 'none' }}>
            <CardContent style={{ padding: 'var(--space-4)' }}>
              <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                With centralized billing, role-based access, usage analytics, and organization management, Nimbus AI is built for businesses that need powerful AI with enterprise-grade governance.
              </p>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </>
  );
}
