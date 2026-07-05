import React, { createContext, useContext, useState } from 'react';
import { MOCK_USERS } from '../lib/mockData';
import { ROLES, canAccessPage, canPerformAction, getActionDisabledTooltip } from '../lib/rbac';

const RBACContext = createContext();

export { ROLES };

export function RBACProvider({ children }) {
  // Default to Owner for demo purposes
  const [currentRole, setCurrentRole] = useState(ROLES.OWNER);

  const currentUser = MOCK_USERS.find(user => user.role === currentRole) || MOCK_USERS[0];

  return (
    <RBACContext.Provider value={{ 
      currentRole, 
      setCurrentRole, 
      currentUser,
      canAccessPage: (path) => canAccessPage(currentRole, path),
      canPerformAction: (action) => canPerformAction(currentRole, action),
      getActionDisabledTooltip: (action) => getActionDisabledTooltip(currentRole, action)
    }}>
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
}
