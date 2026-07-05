# Nimbus AI — Enterprise SaaS Billing & Administration Portal

Nimbus AI is a modern **enterprise SaaS billing and organization management portal** built to simulate how real-world SaaS platforms manage subscriptions, teams, permissions, invoices, and billing workflows.

The project demonstrates enterprise UI/UX patterns commonly found in products such as **Stripe Dashboard**, **GitHub Enterprise**, **Vercel**, **Clerk**, and **Atlassian Admin**.

> **Note:** This is a frontend demonstration project. All data is mocked and no backend services or payment gateways are connected.

---

## ✨ Features

### 📊 Dashboard
- Organization overview
- Subscription summary
- Usage analytics
- Monthly spending
- Recent activity
- Quick actions

### 💳 Subscription Management
- View active subscription
- Compare pricing plans
- Upgrade/Downgrade plans
- Billing cycle management
- Payment summary
- Subscription timeline

### 📄 Invoice History
- Search & filter invoices
- Download invoices
- Invoice details modal
- Payment history timeline
- Status tracking

### 💰 Payment Methods
- Manage saved cards
- Add & remove payment methods
- Billing address
- Tax information
- Payment preferences
- Payment activity

### 👥 Team Management
- Invite members
- Manage users
- Department filtering
- User profile drawer
- Pending invitations
- Seat allocation

### 🛡 Roles & Permissions
- Role overview
- Permission matrix
- Assigned users
- Role history
- Change role workflow
- Enterprise RBAC structure

### 📜 Audit Log
- Complete activity history
- Search & filters
- Security events
- Timeline view
- Export CSV
- Export PDF
- Generate Audit Reports

### 📈 Usage Analytics
- AI credit usage
- Storage utilization
- API requests
- Resource forecasting
- Optimization recommendations

### 💺 Seat Management
- Assigned seats
- Available seats
- Purchase seats
- Transfer seats
- Seat activity timeline

### ⚙ Organization Settings
- Company profile
- Branding
- Security settings
- Notification preferences
- Billing preferences
- Privacy & Data controls

---

# 🔐 Role-Based Access Control (RBAC)

Nimbus AI includes a complete Role-Based Access Control system.

### Roles

- Managing Partner (Owner)
- Finance Partner (Billing Admin)
- Practice Manager (Team Admin)
- Associate (Member)

Each role has different permissions across the application.

Examples include:

- Protected routes
- Dynamic sidebar navigation
- Disabled actions
- Read-only states
- Permission tooltips
- Access denied screens

---

# 🏢 Demo Organization

The application is preconfigured with a fictional organization inspired by the TV series **Suits**.

**Organization**

Pearson Hardman LLP

The demo includes:

- 18 Team Members
- Subscription Management
- Organization Billing
- Role Management
- Audit History
- Mock Payment Data

---

# 📂 Project Structure

```text
src/
│
├── components/
│   ├── layout/
│   ├── ui/
│   └── shared/
│
├── pages/
│   ├── Dashboard/
│   ├── Subscription/
│   ├── Usage/
│   ├── Invoices/
│   ├── PaymentMethods/
│   ├── SeatManagement/
│   ├── Team/
│   ├── Roles/
│   ├── AuditLog/
│   └── Settings/
│
├── context/
│
├── data/
│
├── lib/
│
├── router/
│
└── styles/
```

---

# 🛠 Tech Stack

- React
- Vite
- React Router
- Vanilla CSS
- Lucide React Icons
- Context API
- jsPDF (PDF Export)
- Browser Blob API (CSV Export)

---

# 📑 Export Features

The Audit Log includes working export functionality.

- Export CSV
- Export PDF
- Generate Enterprise Audit Reports

Generated reports include:

- Executive Summary
- Organization Information
- Event Statistics
- Security Events
- Audit Timeline
- Complete Activity Log

---

# 📱 Responsive Design

Nimbus AI is fully responsive across:

- Desktop
- Laptop
- Tablet
- Mobile

---

# 📌 Disclaimer

This project is intended for educational and portfolio purposes only.

All users, organizations, payment information, invoices, and audit events are fictional and generated using mock data.

No real payment processing or backend services are integrated.

---
