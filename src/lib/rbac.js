export const ROLES = {
  OWNER: 'Owner',
  BILLING_ADMIN: 'Billing Admin',
  TEAM_ADMIN: 'Team Admin',
  MEMBER: 'Member'
};

// Maps roles to pages they can access
const PAGE_ACCESS = {
  [ROLES.OWNER]: [
    '/dashboard', '/subscription', '/usage', '/invoices', 
    '/payment-methods', '/seat-management', '/team', '/roles', 
    '/audit-log', '/settings'
  ],
  [ROLES.BILLING_ADMIN]: [
    '/dashboard', '/subscription', '/invoices', '/payment-methods', 
    '/usage', '/audit-log'
  ],
  [ROLES.TEAM_ADMIN]: [
    '/dashboard', '/usage', '/seat-management', '/team'
  ],
  [ROLES.MEMBER]: [
    '/dashboard', '/usage'
  ]
};

// Centralized Action permissions
const ACTION_PERMISSIONS = {
  // Subscription Page Actions
  upgrade_plan: [ROLES.OWNER],
  change_billing_cycle: [ROLES.OWNER, ROLES.BILLING_ADMIN],
  cancel_subscription: [ROLES.OWNER],
  
  // Payment Methods Page Actions
  add_payment_method: [ROLES.OWNER, ROLES.BILLING_ADMIN],
  remove_payment_method: [ROLES.OWNER, ROLES.BILLING_ADMIN],
  edit_billing_address: [ROLES.OWNER, ROLES.BILLING_ADMIN],
  edit_tax_info: [ROLES.OWNER, ROLES.BILLING_ADMIN],
  
  // Invoices Page Actions
  download_invoice: [ROLES.OWNER, ROLES.BILLING_ADMIN],
  view_invoice_details: [ROLES.OWNER, ROLES.BILLING_ADMIN],
  
  // Team Management Page Actions
  invite_member: [ROLES.OWNER, ROLES.TEAM_ADMIN],
  edit_user: [ROLES.OWNER, ROLES.TEAM_ADMIN],
  change_role: [ROLES.OWNER],
  suspend_user: [ROLES.OWNER, ROLES.TEAM_ADMIN],
  remove_user: [ROLES.OWNER, ROLES.TEAM_ADMIN],
  transfer_seat: [ROLES.OWNER, ROLES.TEAM_ADMIN],
  resend_invitation: [ROLES.OWNER, ROLES.TEAM_ADMIN],
  cancel_invitation: [ROLES.OWNER, ROLES.TEAM_ADMIN]
};

// Returns true if role can access page
export function canAccessPage(role, path) {
  const allowedPages = PAGE_ACCESS[role] || [];
  return allowedPages.includes(path);
}

// Returns true if role can perform action
export function canPerformAction(role, action) {
  const allowedRoles = ACTION_PERMISSIONS[action] || [];
  return allowedRoles.includes(role);
}

// Help tooltips explaining why an action is disabled
export function getActionDisabledTooltip(role, action) {
  if (canPerformAction(role, action)) return '';
  
  switch (action) {
    case 'cancel_subscription':
      return 'Only Owners can cancel subscriptions.';
    case 'upgrade_plan':
      return 'Only Owners can upgrade subscription plans.';
    case 'change_billing_cycle':
      return 'Only Owners and Billing Admins can manage billing cycles.';
    case 'add_payment_method':
    case 'remove_payment_method':
      return 'Only Owners and Billing Admins can manage payment methods.';
    case 'edit_billing_address':
    case 'edit_tax_info':
      return 'Only Owners and Billing Admins can update billing details.';
    case 'invite_member':
    case 'suspend_user':
    case 'remove_user':
      return 'Only Owners and Team Admins can manage team members.';
    case 'change_role':
      return 'Only Owners can change user roles.';
    default:
      return 'You do not have permission to perform this action.';
  }
}
