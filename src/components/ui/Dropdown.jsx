import React, { useState, useRef, useEffect } from 'react';

export function Dropdown({ trigger, items, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`dropdown-container ${className}`} style={{ position: 'relative' }} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>
      {isOpen && (
        <div className="dropdown-menu" style={{ display: 'block' }}>
          {items.map((item, index) => (
            <div 
              key={index} 
              className="dropdown-item" 
              onClick={() => {
                if (item.onClick) item.onClick();
                setIsOpen(false);
              }}
            >
              {item.icon && <item.icon size={16} />}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
