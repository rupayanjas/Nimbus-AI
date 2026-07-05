import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export function Modal({ isOpen, onClose, title, children, footer }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-light)' }}>
          <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 600 }}>{title}</h2>
          <Button variant="ghost" size="sm" icon={X} onClick={onClose} style={{ padding: '4px' }} />
        </div>
        <div style={{ padding: 'var(--space-6)', overflowY: 'auto' }}>
          {children}
        </div>
        {footer && (
          <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--border-light)', backgroundColor: 'var(--surface-hover)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
