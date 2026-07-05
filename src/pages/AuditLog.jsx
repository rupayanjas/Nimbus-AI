import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { Avatar } from '../components/ui/Avatar';
import { EmptyState } from '../components/ui/EmptyState';
import { useRBAC } from '../context/RBACContext';
import { 
  FileText, Download, Eye, Search, Filter, Shield, AlertTriangle, 
  Settings, Users, CreditCard, ChevronRight, Activity, Calendar, Info
} from 'lucide-react';

const MOCK_AUDIT_EVENTS = [
  { id: 'EVT-9081', timestamp: 'July 12, 10:45 AM', user: 'Jessica Pearson', role: 'Owner', action: 'Upgraded Subscription', category: 'Subscriptions', resource: 'Growth Plan', ip: '192.168.1.15', severity: 'Medium', status: 'Success', prevVal: 'Starter Plan', newVal: 'Growth Plan', browser: 'Chrome 120.0', os: 'macOS Sonoma', location: 'San Francisco, US' },
  { id: 'EVT-9080', timestamp: 'July 12, 10:12 AM', user: 'Harvey Spector', role: 'Billing Admin', action: 'Downloaded Invoice INV-1042', category: 'Billing', resource: 'Invoice', ip: '192.168.1.24', severity: 'Low', status: 'Success', prevVal: 'None', newVal: 'Downloaded', browser: 'Safari 17.2', os: 'macOS Sonoma', location: 'San Francisco, US' },
  { id: 'EVT-9079', timestamp: 'July 11, 04:30 PM', user: 'Donna Paulsen', role: 'Team Admin', action: 'Invited Louis Litt', category: 'Teams', resource: 'Users', ip: '192.168.1.45', severity: 'Low', status: 'Success', prevVal: 'None', newVal: 'louis.litt@pearsonhardman.com', browser: 'Firefox 121.0', os: 'Windows 11', location: 'Denver, US' },
  { id: 'EVT-9078', timestamp: 'July 11, 02:15 PM', user: 'Jessica Pearson', role: 'Owner', action: 'Changed Billing Card', category: 'Payments', resource: 'Visa', ip: '192.168.1.15', severity: 'High', status: 'Success', prevVal: 'Visa ****1234', newVal: 'Visa ****4567', browser: 'Chrome 120.0', os: 'macOS Sonoma', location: 'San Francisco, US' },
  { id: 'EVT-9077', timestamp: 'July 11, 09:12 AM', user: 'Louis Litt', role: 'Member', action: 'Failed Login Attempt', category: 'Security', resource: 'Authentication', ip: '192.168.1.90', severity: 'Critical', status: 'Failed', prevVal: 'None', newVal: 'Failed Authentication', browser: 'Chrome 120.0', os: 'Windows 11', location: 'New York, US' },
  { id: 'EVT-9076', timestamp: 'July 10, 05:00 PM', user: 'Donna Paulsen', role: 'Team Admin', action: 'Purchased 5 Seats', category: 'Teams', resource: 'Seats', ip: '192.168.1.45', severity: 'Medium', status: 'Success', prevVal: '20 seats', newVal: '25 seats', browser: 'Firefox 121.0', os: 'Windows 11', location: 'Denver, US' },
  { id: 'EVT-9075', timestamp: 'July 10, 03:40 PM', user: 'Harvey Spector', role: 'Billing Admin', action: 'Updated Tax Region', category: 'Settings', resource: 'Tax Settings', ip: '192.168.1.24', severity: 'Medium', status: 'Success', prevVal: 'Delaware', newVal: 'California', browser: 'Safari 17.2', os: 'macOS Sonoma', location: 'San Francisco, US' },
  { id: 'EVT-9074', timestamp: 'July 10, 11:20 AM', user: 'Jessica Pearson', role: 'Owner', action: 'Modified Auth Policies', category: 'Security', resource: 'Roles', ip: '192.168.1.15', severity: 'High', status: 'Success', prevVal: 'MFA Optional', newVal: 'MFA Required', browser: 'Chrome 120.0', os: 'macOS Sonoma', location: 'San Francisco, US' },
  { id: 'EVT-9073', timestamp: 'July 09, 02:30 PM', user: 'Louis Litt', role: 'Member', action: 'Authorized API Token', category: 'Security', resource: 'Settings', ip: '192.168.1.90', severity: 'High', status: 'Success', prevVal: 'None', newVal: 'nimbus_api_token_read', browser: 'Chrome 120.0', os: 'Windows 11', location: 'New York, US' },
  { id: 'EVT-9072', timestamp: 'July 09, 09:45 AM', user: 'David Kim', role: 'Team Admin', action: 'Suspended Mike Ross', category: 'Teams', resource: 'Users', ip: '192.168.1.81', severity: 'High', status: 'Success', prevVal: 'Active', newVal: 'Suspended', browser: 'Edge 120.0', os: 'Windows 11', location: 'Seattle, US' },
  { id: 'EVT-9071', timestamp: 'July 08, 04:10 PM', user: 'Harvey Spector', role: 'Billing Admin', action: 'Exported Invoices CSV', category: 'Billing', resource: 'Invoice', ip: '192.168.1.24', severity: 'Low', status: 'Success', prevVal: 'None', newVal: 'Exported', browser: 'Safari 17.2', os: 'macOS Sonoma', location: 'San Francisco, US' },
  { id: 'EVT-9070', timestamp: 'July 08, 11:15 AM', user: 'Sophia Patel', role: 'Billing Admin', action: 'Added Mastercard Backup', category: 'Payments', resource: 'Mastercard', ip: '192.168.1.33', severity: 'Medium', status: 'Success', prevVal: 'None', newVal: 'Mastercard ****7812', browser: 'Chrome 120.0', os: 'macOS Sonoma', location: 'San Jose, US' },
  { id: 'EVT-9069', timestamp: 'July 07, 03:30 PM', user: 'Donna Paulsen', role: 'Team Admin', action: 'Reallocated Seat #12', category: 'Teams', resource: 'Seats', ip: '192.168.1.45', severity: 'Medium', status: 'Success', prevVal: 'Unallocated', newVal: 'Lisa Wong', browser: 'Firefox 121.0', os: 'Windows 11', location: 'Denver, US' },
  { id: 'EVT-9068', timestamp: 'July 07, 10:10 AM', user: 'Jessica Pearson', role: 'Owner', action: 'Deleted Dev Workspace', category: 'Settings', resource: 'Settings', ip: '192.168.1.15', severity: 'High', status: 'Success', prevVal: 'dev-workspace-1', newVal: 'Deleted', browser: 'Chrome 120.0', os: 'macOS Sonoma', location: 'San Francisco, US' },
  { id: 'EVT-9067', timestamp: 'July 06, 02:40 PM', user: 'Lisa Wong', role: 'Team Admin', action: 'Invited Clark Kent', category: 'Teams', resource: 'Users', ip: '192.168.1.66', severity: 'Low', status: 'Success', prevVal: 'None', newVal: 'clark.k@pearsonhardman.com', browser: 'Safari 17.1', os: 'iOS 17', location: 'Los Angeles, US' },
  { id: 'EVT-9066', timestamp: 'July 06, 09:30 AM', user: 'Sophia Patel', role: 'Billing Admin', action: 'Edited Billing Address', category: 'Settings', resource: 'Invoice', ip: '192.168.1.33', severity: 'Medium', status: 'Success', prevVal: '100 Main St', newVal: '123 Innovation Drive', browser: 'Chrome 120.0', os: 'macOS Sonoma', location: 'San Jose, US' },
  { id: 'EVT-9065', timestamp: 'July 05, 04:20 PM', user: 'Louis Litt', role: 'Member', action: 'Reset Password Request', category: 'Security', resource: 'Authentication', ip: '192.168.1.90', severity: 'Medium', status: 'Success', prevVal: 'None', newVal: 'Reset Email Sent', browser: 'Chrome 120.0', os: 'Windows 11', location: 'New York, US' },
  { id: 'EVT-9064', timestamp: 'July 05, 11:30 AM', user: 'Jessica Pearson', role: 'Owner', action: 'Created Production API Key', category: 'Security', resource: 'Settings', ip: '192.168.1.15', severity: 'High', status: 'Success', prevVal: 'None', newVal: 'nimbus_api_prod_live', browser: 'Chrome 120.0', os: 'macOS Sonoma', location: 'San Francisco, US' },
  { id: 'EVT-9063', timestamp: 'July 04, 03:15 PM', user: 'Donna Paulsen', role: 'Team Admin', action: 'Invited Monica Geller', category: 'Teams', resource: 'Users', ip: '192.168.1.45', severity: 'Low', status: 'Success', prevVal: 'None', newVal: 'monica@pearsonhardman.com', browser: 'Firefox 121.0', os: 'Windows 11', location: 'Denver, US' },
  { id: 'EVT-9062', timestamp: 'July 04, 10:00 AM', user: 'Harvey Spector', role: 'Billing Admin', action: 'Viewed Invoice History', category: 'Billing', resource: 'Invoice', ip: '192.168.1.24', severity: 'Low', status: 'Success', prevVal: 'None', newVal: 'Viewed', browser: 'Safari 17.2', os: 'macOS Sonoma', location: 'San Francisco, US' }
];

export function AuditLog() {
  const { currentRole, currentUser } = useRBAC();
  const [toast, setToast] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'timeline'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // New report generation and export states
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportForm, setReportForm] = useState({
    name: 'Monthly Audit Report',
    dateRange: 'last_30',
    sections: {
      executiveSummary: true,
      billingEvents: true,
      teamEvents: true,
      securityEvents: true,
      roleChanges: true,
      failedLogins: true,
      subscriptionChanges: true
    },
    format: 'PDF'
  });
  const [generationStep, setGenerationStep] = useState(null); // null, 0, 1, 2, 3, 4
  const [isExportingCSV, setIsExportingCSV] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const exportToCSV = (data, filenamePrefix = 'pearson-hardman-audit-log') => {
    const headers = ['Timestamp', 'User', 'Action', 'Category', 'Resource', 'IP Address', 'Severity', 'Status'];
    const rows = data.map(event => [
      event.timestamp,
      event.user,
      event.action,
      event.category,
      event.resource,
      event.ip,
      event.severity,
      event.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `${filenamePrefix}-${dateStr}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = (format) => {
    const dateStr = new Date().toISOString().split('T')[0];
    
    if (format === 'csv') {
      setIsExportingCSV(true);
      setTimeout(() => {
        try {
          exportToCSV(filteredEvents, 'pearson-hardman-audit-log');
          showToast('✓ CSV exported successfully', 'success');
        } catch (err) {
          showToast('Failed to export CSV', 'danger');
        } finally {
          setIsExportingCSV(false);
        }
      }, 500);
    } 
    
    else if (format === 'pdf') {
      setIsExportingPDF(true);
      setTimeout(() => {
        try {
          const doc = new jsPDF();
          const formattedDate = new Date().toLocaleDateString('en-IN', {
            day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
          });

          const primaryColor = [153, 126, 103]; // #997E67
          const darkTextColor = [51, 51, 51];
          const lightTextColor = [102, 102, 102];

          // Title / Header
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(22);
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.text('Nimbus AI', 20, 20);

          doc.setFontSize(14);
          doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
          doc.text('Audit Log Report', 20, 28);

          // Divider
          doc.setDrawColor(204, 190, 177); // var(--border)
          doc.setLineWidth(0.5);
          doc.line(20, 32, 190, 32);

          // Metadata Details
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
          
          doc.setFont('Helvetica', 'bold');
          doc.text('Organization:', 20, 40);
          doc.setFont('Helvetica', 'normal');
          doc.text('Pearson Hardman LLP', 50, 40);

          doc.setFont('Helvetica', 'bold');
          doc.text('Generated:', 20, 46);
          doc.setFont('Helvetica', 'normal');
          doc.text(formattedDate, 50, 46);

          doc.setFont('Helvetica', 'bold');
          doc.text('Generated By:', 20, 52);
          doc.setFont('Helvetica', 'normal');
          doc.text(`${currentUser?.name || 'User'} (${currentUser?.role || 'Role'})`, 50, 52);

          // Summary Metrics
          const totalEvents = filteredEvents.length;
          const todayEvents = filteredEvents.filter(e => e.timestamp.includes('July 12') || e.timestamp.toLowerCase().includes('today')).length;
          const securityEvents = filteredEvents.filter(e => e.category.toLowerCase() === 'security').length;
          const roleChanges = filteredEvents.filter(e => e.action.toLowerCase().includes('role') || e.resource.toLowerCase() === 'roles').length;

          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
          doc.text('Summary Metrics', 20, 62);

          // Summary Card Row
          doc.setFillColor(245, 241, 237); // Light beige background
          doc.roundedRect(20, 66, 170, 20, 3, 3, 'F');

          doc.setFontSize(8);
          doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
          doc.text('TOTAL EVENTS', 25, 73);
          doc.text("TODAY'S EVENTS", 65, 73);
          doc.text('SECURITY EVENTS', 105, 73);
          doc.text('ROLE CHANGES', 145, 73);

          doc.setFontSize(12);
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.text(String(totalEvents), 25, 81);
          doc.text(String(todayEvents), 65, 81);
          doc.text(String(securityEvents), 105, 81);
          doc.text(String(roleChanges), 145, 81);

          // Table Headers and Rows
          const tableHeaders = [['Timestamp', 'User', 'Action', 'Category', 'Severity', 'Status']];
          const tableRows = filteredEvents.map(event => [
            event.timestamp,
            event.user,
            event.action,
            event.category,
            event.severity,
            event.status
          ]);

          autoTable(doc, {
            startY: 92,
            head: tableHeaders,
            body: tableRows,
            theme: 'striped',
            headStyles: {
              fillColor: primaryColor,
              textColor: [255, 255, 255],
              fontStyle: 'bold',
              fontSize: 9
            },
            bodyStyles: {
              fontSize: 8,
              textColor: darkTextColor
            },
            margin: { left: 20, right: 20 },
            didDrawPage: (data) => {
              doc.setFont('Helvetica', 'normal');
              doc.setFontSize(8);
              doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
              const str = 'Page ' + doc.internal.getNumberOfPages();
              doc.text(str, 190 - doc.getTextWidth(str), 285);
              doc.text('Confidential Internal Document', 105 - doc.getTextWidth('Confidential Internal Document') / 2, 285);
              doc.text('Generated by Nimbus AI', 20, 285);
            }
          });

          doc.save(`pearson-hardman-audit-report-${dateStr}.pdf`);
          showToast('✓ PDF exported successfully', 'success');
        } catch (err) {
          showToast('Failed to export PDF', 'danger');
        } finally {
          setIsExportingPDF(false);
        }
      }, 500);
    }
    
    else if (format === 'report') {
      setIsReportModalOpen(true);
      setGenerationStep(null);
    }
  };

  const handleStartReportGeneration = () => {
    setGenerationStep(0);
    
    const steps = [
      { step: 0, delay: 0 },
      { step: 1, delay: 500 },
      { step: 2, delay: 1000 },
      { step: 3, delay: 1500 },
      { step: 4, delay: 2000 }
    ];

    steps.forEach(({ step, delay }) => {
      setTimeout(() => {
        setGenerationStep(step);
      }, delay);
    });
  };

  const downloadGeneratedReport = () => {
    try {
      const dateRangeLabel = 
        reportForm.dateRange === 'last_7' ? 'Last 7 Days' :
        reportForm.dateRange === 'last_30' ? 'Last 30 Days' :
        reportForm.dateRange === 'last_quarter' ? 'Last Quarter' : 'Custom / All';

      if (reportForm.format === 'CSV') {
        let filteredData = [...MOCK_AUDIT_EVENTS];
        if (reportForm.dateRange === 'last_7') {
          filteredData = MOCK_AUDIT_EVENTS.filter(e => {
            const day = parseInt(e.timestamp.match(/July (\d+)/)?.[1] || '0');
            return day >= 5 && day <= 12;
          });
        } else if (reportForm.dateRange === 'last_30') {
          filteredData = MOCK_AUDIT_EVENTS.filter(e => e.timestamp.includes('July') || e.timestamp.includes('June'));
        } else if (reportForm.dateRange === 'last_quarter') {
          filteredData = MOCK_AUDIT_EVENTS.filter(e => e.timestamp.includes('July') || e.timestamp.includes('June') || e.timestamp.includes('May'));
        }

        exportToCSV(filteredData, reportForm.name.toLowerCase().replace(/\s+/g, '-'));
        showToast('✓ CSV exported successfully', 'success');
      } else {
        // PDF format
        const doc = new jsPDF();
        const dateStr = new Date().toISOString().split('T')[0];
        const formattedDate = new Date().toLocaleDateString('en-IN', {
          day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        const primaryColor = [153, 126, 103]; // #997E67
        const darkTextColor = [51, 51, 51];
        const lightTextColor = [102, 102, 102];

        // 1. COVER PAGE
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text('Nimbus AI', 20, 60);

        doc.setFontSize(18);
        doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
        doc.text('Enterprise Audit Report', 20, 72);

        doc.setFontSize(12);
        doc.setFont('Helvetica', 'normal');
        doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
        doc.text(reportForm.name || 'Monthly Audit Report', 20, 80);

        // Metadata Panel on Cover
        doc.setFillColor(248, 246, 244);
        doc.roundedRect(20, 95, 170, 60, 4, 4, 'F');
        
        doc.setFontSize(10);
        doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
        
        doc.setFont('Helvetica', 'bold');
        doc.text('Organization Summary', 25, 105);
        
        doc.setFont('Helvetica', 'normal');
        
        doc.setFont('Helvetica', 'bold');
        doc.text('Organization:', 25, 115);
        doc.setFont('Helvetica', 'normal');
        doc.text('Pearson Hardman LLP', 60, 115);

        doc.setFont('Helvetica', 'bold');
        doc.text('Current Plan:', 25, 121);
        doc.setFont('Helvetica', 'normal');
        doc.text('Growth', 60, 121);

        doc.setFont('Helvetica', 'bold');
        doc.text('Generated By:', 25, 127);
        doc.setFont('Helvetica', 'normal');
        doc.text(`${currentUser?.name || 'User'} (${currentUser?.role || 'Role'})`, 60, 127);

        doc.setFont('Helvetica', 'bold');
        doc.text('Generated On:', 25, 133);
        doc.setFont('Helvetica', 'normal');
        doc.text(formattedDate, 60, 133);

        doc.setFont('Helvetica', 'bold');
        doc.text('Date Range:', 25, 139);
        doc.setFont('Helvetica', 'normal');
        doc.text(dateRangeLabel, 60, 139);

        // Confidential notice on cover
        doc.setFontSize(9);
        doc.setFont('Helvetica', 'italic');
        doc.text('This is a confidential enterprise compliance document generated by Nimbus AI.', 20, 170);

        // Draw Page Number / Footer info on Cover
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8);
        doc.text('Generated by Nimbus AI • Confidential', 20, 285);

        // Filter events based on dateRange
        let filteredData = [...MOCK_AUDIT_EVENTS];
        if (reportForm.dateRange === 'last_7') {
          filteredData = MOCK_AUDIT_EVENTS.filter(e => {
            const day = parseInt(e.timestamp.match(/July (\d+)/)?.[1] || '0');
            return day >= 5 && day <= 12;
          });
        } else if (reportForm.dateRange === 'last_30') {
          filteredData = MOCK_AUDIT_EVENTS.filter(e => e.timestamp.includes('July') || e.timestamp.includes('June'));
        } else if (reportForm.dateRange === 'last_quarter') {
          filteredData = MOCK_AUDIT_EVENTS.filter(e => e.timestamp.includes('July') || e.timestamp.includes('June') || e.timestamp.includes('May'));
        }

        // 2. EXECUTIVE SUMMARY
        if (reportForm.sections.executiveSummary) {
          doc.addPage();
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(16);
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.text('Executive Summary', 20, 25);
          doc.line(20, 29, 190, 29);

          const totalEvents = filteredData.length;
          const todayEvents = filteredData.filter(e => e.timestamp.includes('July 12') || e.timestamp.toLowerCase().includes('today')).length;
          const criticalEvents = filteredData.filter(e => e.severity === 'Critical').length;
          const failedLogins = filteredData.filter(e => e.action.toLowerCase().includes('failed login')).length;
          const roleChanges = filteredData.filter(e => e.action.toLowerCase().includes('role') || e.resource.toLowerCase() === 'roles').length;
          const invoicesDownloaded = filteredData.filter(e => e.action.toLowerCase().includes('invoice')).length;
          const subscriptionChanges = filteredData.filter(e => e.category.toLowerCase() === 'subscriptions').length;

          doc.setFontSize(10);
          doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);

          const metrics = [
            { label: 'Total Events Analysed', value: totalEvents },
            { label: "Today's Events", value: todayEvents },
            { label: 'Critical Security Risks', value: criticalEvents },
            { label: 'Failed Login Attempts', value: failedLogins },
            { label: 'Role / Access Changes', value: roleChanges },
            { label: 'Invoices Downloaded', value: invoicesDownloaded },
            { label: 'Subscription Changes', value: subscriptionChanges },
          ];

          let startY = 40;
          metrics.forEach(m => {
            doc.setFont('Helvetica', 'bold');
            doc.text(m.label, 20, startY);
            doc.setFont('Helvetica', 'normal');
            doc.text(String(m.value), 120, startY);
            doc.setDrawColor(240, 235, 230);
            doc.line(20, startY + 3, 190, startY + 3);
            startY += 10;
          });
        }

        // 3. SECURITY HIGHLIGHTS
        if (reportForm.sections.securityEvents || reportForm.sections.failedLogins) {
          doc.addPage();
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(16);
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.text('Security Highlights', 20, 25);
          doc.line(20, 29, 190, 29);

          const securityEventsList = filteredData.filter(e => 
            e.severity === 'Critical' || e.severity === 'High' || e.category.toLowerCase() === 'security'
          );

          if (securityEventsList.length > 0) {
            const secHeaders = [['Timestamp', 'User', 'Action', 'Severity', 'IP Address']];
            const secRows = securityEventsList.map(e => [e.timestamp, e.user, e.action, e.severity, e.ip]);
            
            autoTable(doc, {
              startY: 35,
              head: secHeaders,
              body: secRows,
              theme: 'striped',
              headStyles: { fillColor: [194, 65, 12], textColor: [255, 255, 255] },
              bodyStyles: { fontSize: 8 }
            });
          } else {
            doc.setFontSize(11);
            doc.setFont('Helvetica', 'normal');
            doc.text('No high-severity security events detected during this period.', 20, 40);
          }
        }

        // 4. CATEGORY BREAKDOWN
        if (reportForm.sections.billingEvents || reportForm.sections.teamEvents) {
          doc.addPage();
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(16);
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.text('Category Breakdown', 20, 25);
          doc.line(20, 29, 190, 29);

          const categories = ['Billing', 'Payments', 'Teams', 'Roles', 'Security', 'Settings', 'Subscriptions'];
          const breakdown = categories.map(cat => {
            const count = filteredData.filter(e => e.category.toLowerCase() === cat.toLowerCase()).length;
            return { category: cat, count };
          });

          const breakHeaders = [['Category', 'Event Count', 'Percentage']];
          const totalCount = filteredData.length || 1;
          const breakRows = breakdown.map(b => [
            b.category,
            String(b.count),
            `${Math.round((b.count / totalCount) * 100)}%`
          ]);

          autoTable(doc, {
            startY: 35,
            head: breakHeaders,
            body: breakRows,
            theme: 'grid',
            headStyles: { fillColor: primaryColor, textColor: [255, 255, 255] },
            bodyStyles: { fontSize: 9 }
          });
        }

        // 5. EVENT DETAILS TABLE
        doc.addPage();
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text('Complete Audit Events List', 20, 25);
        doc.line(20, 29, 190, 29);

        const tableHeaders = [['Timestamp', 'User', 'Action', 'Category', 'Severity', 'Status']];
        const tableRows = filteredData.map(event => [
          event.timestamp,
          event.user,
          event.action,
          event.category,
          event.severity,
          event.status
        ]);

        autoTable(doc, {
          startY: 35,
          head: tableHeaders,
          body: tableRows,
          theme: 'striped',
          headStyles: {
            fillColor: primaryColor,
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 9
          },
          bodyStyles: {
            fontSize: 8,
            textColor: darkTextColor
          },
          margin: { left: 20, right: 20 },
          didDrawPage: (data) => {
            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
            const str = 'Page ' + doc.internal.getNumberOfPages();
            doc.text(str, 190 - doc.getTextWidth(str), 285);
            doc.text('Confidential Internal Document', 105 - doc.getTextWidth('Confidential Internal Document') / 2, 285);
            doc.text('Generated by Nimbus AI', 20, 285);
          }
        });

        doc.save(`${reportForm.name.toLowerCase().replace(/\s+/g, '-')}-${dateStr}.pdf`);
        showToast('✓ PDF exported successfully', 'success');
      }
      setIsReportModalOpen(false);
      setGenerationStep(null);
    } catch (err) {
      showToast('Failed to generate report', 'danger');
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical': return <Badge variant="danger">Critical</Badge>;
      case 'High': return <Badge variant="warning">High</Badge>;
      case 'Medium': return <Badge variant="primary">Medium</Badge>;
      default: return <Badge variant="default">Low</Badge>;
    }
  };

  const getCategoryBadge = (category) => {
    const style = { fontWeight: 500, fontSize: 'var(--font-xs)', textTransform: 'capitalize' };
    switch (category.toLowerCase()) {
      case 'billing':
      case 'payments':
      case 'subscriptions':
        return <Badge variant="primary" style={style}>{category}</Badge>;
      case 'teams':
        return <Badge variant="success" style={style}>{category}</Badge>;
      case 'security':
        return <Badge variant="danger" style={style}>{category}</Badge>;
      default:
        return <Badge variant="default" style={style}>{category}</Badge>;
    }
  };

  // Filter logic
  const filteredEvents = MOCK_AUDIT_EVENTS.filter(event => {
    const matchesSearch = event.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.action.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    const matchesSeverity = selectedSeverity ? event.severity === selectedSeverity : true;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const columns = [
    { header: 'Timestamp', accessor: 'timestamp', render: (row) => <span style={{ color: 'var(--text-secondary)' }}>{row.timestamp}</span> },
    { header: 'User', accessor: 'user', render: (row) => <span style={{ fontWeight: 600 }}>{row.user}</span> },
    { header: 'Action', accessor: 'action' },
    { header: 'Category', render: (row) => getCategoryBadge(row.category) },
    { header: 'Resource', accessor: 'resource' },
    { header: 'IP Address', accessor: 'ip', render: (row) => <code style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{row.ip}</code> },
    { header: 'Severity', render: (row) => getSeverityBadge(row.severity) },
    { header: 'Status', render: (row) => <span style={{ color: row.status === 'Success' ? 'var(--success)' : 'var(--danger)', fontWeight: 500 }}>{row.status}</span> },
    { 
      header: 'Actions', 
      render: (row) => (
        <Button variant="ghost" size="sm" icon={Eye} onClick={() => setSelectedEvent(row)}>View</Button>
      )
    }
  ];

  // Group events by day for timeline view
  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const day = event.timestamp.split(',')[0];
    if (!groups[day]) groups[day] = [];
    groups[day].push(event);
    return groups;
  }, {});

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 className="page-title">Audit Log</h1>
          <p className="page-subtitle">Review security events and administrative actions.</p>
        </div>
        
        {/* Export Controls */}
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="secondary" onClick={() => handleExport('csv')} disabled={isExportingCSV || isExportingPDF}>{isExportingCSV ? 'Exporting...' : 'Export CSV'}</Button>
          <Button variant="secondary" onClick={() => handleExport('pdf')} disabled={isExportingCSV || isExportingPDF}>{isExportingPDF ? 'Exporting...' : 'Export PDF'}</Button>
          <Button variant="primary" onClick={() => handleExport('report')} disabled={isExportingCSV || isExportingPDF}>Generate Report</Button>
        </div>
      </div>

      {currentRole === 'Billing Admin' && (
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
          <span>You are viewing the audit log as a <strong>Billing Admin</strong>. Security actions and active IP blocks are restricted to the <strong>Owner</strong>.</span>
        </div>
      )}

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Total Events</span>
              <Activity size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>1,284</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Today's Events</span>
              <Calendar size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>42</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Security Events</span>
              <Shield size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>7</span>
              <Badge variant="danger">Review</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Role Changes</span>
              <Settings size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>18</div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts Warning Panel */}
      <div style={{
        backgroundColor: 'var(--warning-light)',
        border: '1px solid var(--warning)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4) var(--space-6)',
        marginBottom: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 600, color: 'var(--text-primary)', borderBottom: '1px solid rgba(245, 158, 11, 0.2)', paddingBottom: 'var(--space-2)' }}>
          <AlertTriangle color="var(--warning)" size={20} /> Security Risk Indicators
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-sm)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            <span>Failed logins detected from IP <code>192.168.1.90</code> (Authentication)</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Badge variant="danger">Critical</Badge>
              <Button variant="ghost" size="sm" style={{ padding: '0 4px', color: 'var(--text-primary)' }} onClick={() => showToast('Initiating IP block routine...', 'info')} disabled={currentRole !== 'Owner'} title={currentRole !== 'Owner' ? 'Only Owners can manage network bans.' : ''}>Block IP</Button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-sm)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            <span>Production API Key created (Jessica Pearson)</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Badge variant="warning">High</Badge>
              <Button variant="ghost" size="sm" style={{ padding: '0 4px', color: 'var(--text-primary)' }} onClick={() => showToast('API details logged to compliance.', 'info')} disabled={currentRole !== 'Owner'} title={currentRole !== 'Owner' ? 'Only Owners can audit API tokens.' : ''}>Audit Key</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Content section */}
      <Card style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-light)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="input-field" 
                style={{ paddingLeft: '32px', width: '100%' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select className="input-field" style={{ minWidth: '130px' }} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Category: All</option>
              <option value="Billing">Billing</option>
              <option value="Payments">Payments</option>
              <option value="Teams">Teams</option>
              <option value="Security">Security</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Settings">Settings</option>
            </select>

            <select className="input-field" style={{ minWidth: '130px' }} value={selectedSeverity} onChange={(e) => setSelectedSeverity(e.target.value)}>
              <option value="">Severity: All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Toggle between Table and Timeline */}
          <div style={{ display: 'flex', backgroundColor: 'var(--bg)', padding: '2px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <button 
              style={{ 
                padding: 'var(--space-1) var(--space-3)', 
                fontSize: 'var(--font-xs)', 
                fontWeight: 500,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'table' ? 'var(--surface)' : 'transparent',
                boxShadow: viewMode === 'table' ? 'var(--shadow-sm)' : 'none',
                color: viewMode === 'table' ? 'var(--text-primary)' : 'var(--text-secondary)'
              }}
              onClick={() => setViewMode('table')}
            >
              Table View
            </button>
            <button 
              style={{ 
                padding: 'var(--space-1) var(--space-3)', 
                fontSize: 'var(--font-xs)', 
                fontWeight: 500,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'timeline' ? 'var(--surface)' : 'transparent',
                boxShadow: viewMode === 'timeline' ? 'var(--shadow-sm)' : 'none',
                color: viewMode === 'timeline' ? 'var(--text-primary)' : 'var(--text-secondary)'
              }}
              onClick={() => setViewMode('timeline')}
            >
              Timeline View
            </button>
          </div>

        </div>

        {filteredEvents.length > 0 ? (
          viewMode === 'table' ? (
            <div className="table-container">
              <Table columns={columns} data={filteredEvents} />
            </div>
          ) : (
            <div style={{ padding: 'var(--space-6)' }}>
              {Object.keys(groupedEvents).map(day => (
                <div key={day} style={{ marginBottom: 'var(--space-6)' }}>
                  <h3 style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px' }}>
                    {day}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingLeft: 'var(--space-2)' }}>
                    {groupedEvents[day].map(evt => (
                      <div 
                        key={evt.id} 
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                        onClick={() => setSelectedEvent(evt)}
                      >
                        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                          <Avatar initials={evt.user.split(' ').map(n=>n[0]).join('')} size="sm" />
                          <div>
                            <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>
                              <span style={{ fontWeight: 600 }}>{evt.user}</span> {evt.action}
                            </div>
                            <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                              ID: {evt.id} • IP: {evt.ip}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                          {getCategoryBadge(evt.category)}
                          {getSeverityBadge(evt.severity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <EmptyState 
            icon={FileText} 
            title="No audit events have been recorded." 
            description="Clear your filters to see historical access logs."
          />
        )}
      </Card>

      {/* Detail View Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title="Event Details"
        footer={<Button variant="ghost" onClick={() => setSelectedEvent(null)}>Close</Button>}
      >
        {selectedEvent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Event ID</div>
                <div style={{ fontSize: 'var(--font-base)', fontWeight: 600 }}>{selectedEvent.id}</div>
              </div>
              {getSeverityBadge(selectedEvent.severity)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', backgroundColor: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Timestamp</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{selectedEvent.timestamp}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Status</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: selectedEvent.status === 'Success' ? 'var(--success)' : 'var(--danger)' }}>{selectedEvent.status}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Actor</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{selectedEvent.user} ({selectedEvent.role})</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Category</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{selectedEvent.category}</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>Action Performance</div>
              <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600 }}>{selectedEvent.action}</div>
            </div>

            <div>
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>Metadata / Value Transition</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: 'var(--space-3)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Previous Value</div>
                  <div style={{ fontSize: 'var(--font-xs)', fontWeight: 500, wordBreak: 'break-all' }}>{selectedEvent.prevVal}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>New Value</div>
                  <div style={{ fontSize: 'var(--font-xs)', fontWeight: 500, wordBreak: 'break-all', color: 'var(--primary)' }}>{selectedEvent.newVal}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-3)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>IP Address</div>
                <div style={{ fontSize: 'var(--font-sm)' }}><code>{selectedEvent.ip}</code></div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Location</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{selectedEvent.location}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Operating System</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{selectedEvent.os}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Browser Client</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{selectedEvent.browser}</div>
              </div>
            </div>

          </div>
        )}
      </Modal>

      {/* Generate Report Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => {
          if (generationStep !== 4 && generationStep !== null) return; // disable closing while generating
          setIsReportModalOpen(false);
          setGenerationStep(null);
        }}
        title="Generate Audit Report"
        footer={
          generationStep === null ? (
            <>
              <Button variant="ghost" onClick={() => setIsReportModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleStartReportGeneration}>Generate</Button>
            </>
          ) : generationStep === 4 ? (
            <>
              <Button variant="ghost" onClick={() => { setIsReportModalOpen(false); setGenerationStep(null); }}>Close</Button>
              <Button variant="primary" onClick={downloadGeneratedReport}>Download Report</Button>
            </>
          ) : null
        }
      >
        {generationStep === null ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Report Name</label>
              <input 
                type="text" 
                className="input-field" 
                value={reportForm.name} 
                onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })} 
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Date Range</label>
              <select 
                className="input-field" 
                value={reportForm.dateRange} 
                onChange={(e) => setReportForm({ ...reportForm, dateRange: e.target.value })}
                style={{ width: '100%' }}
              >
                <option value="last_7">Last 7 Days</option>
                <option value="last_30">Last 30 Days</option>
                <option value="last_quarter">Last Quarter</option>
                <option value="custom">Custom / All History</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '4px' }}>Include Sections</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-sm)', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={reportForm.sections.executiveSummary} 
                    onChange={(e) => setReportForm({ ...reportForm, sections: { ...reportForm.sections, executiveSummary: e.target.checked } })}
                  />
                  Executive Summary
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-sm)', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={reportForm.sections.billingEvents} 
                    onChange={(e) => setReportForm({ ...reportForm, sections: { ...reportForm.sections, billingEvents: e.target.checked } })}
                  />
                  Billing Events
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-sm)', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={reportForm.sections.teamEvents} 
                    onChange={(e) => setReportForm({ ...reportForm, sections: { ...reportForm.sections, teamEvents: e.target.checked } })}
                  />
                  Team Events
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-sm)', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={reportForm.sections.securityEvents} 
                    onChange={(e) => setReportForm({ ...reportForm, sections: { ...reportForm.sections, securityEvents: e.target.checked } })}
                  />
                  Security Events
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-sm)', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={reportForm.sections.roleChanges} 
                    onChange={(e) => setReportForm({ ...reportForm, sections: { ...reportForm.sections, roleChanges: e.target.checked } })}
                  />
                  Role Changes
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-sm)', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={reportForm.sections.failedLogins} 
                    onChange={(e) => setReportForm({ ...reportForm, sections: { ...reportForm.sections, failedLogins: e.target.checked } })}
                  />
                  Failed Logins
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-sm)', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={reportForm.sections.subscriptionChanges} 
                    onChange={(e) => setReportForm({ ...reportForm, sections: { ...reportForm.sections, subscriptionChanges: e.target.checked } })}
                  />
                  Subscription Changes
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Report Format</label>
              <select 
                className="input-field" 
                value={reportForm.format} 
                onChange={(e) => setReportForm({ ...reportForm, format: e.target.value })}
                style={{ width: '100%' }}
              >
                <option value="PDF">PDF Report Document</option>
                <option value="CSV">CSV Spreadsheet</option>
              </select>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--space-6) 0', gap: 'var(--space-4)' }}>
            {generationStep < 4 ? (
              <>
                <div style={{ 
                  width: '40px', height: '40px', 
                  border: '3px solid var(--border-light)', 
                  borderTopColor: 'var(--primary)', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite' 
                }}></div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)', textAlign: 'center' }}>
                  {generationStep === 0 && 'Generating report...'}
                  {generationStep === 1 && 'Preparing audit events...'}
                  {generationStep === 2 && 'Formatting report...'}
                  {generationStep === 3 && 'Creating download...'}
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-light)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    backgroundColor: 'var(--primary)', 
                    borderRadius: '3px', 
                    width: generationStep === 0 ? '20%' : generationStep === 1 ? '50%' : generationStep === 2 ? '75%' : '90%',
                    transition: 'width 0.3s ease' 
                  }}></div>
                </div>
              </>
            ) : (
              <>
                <div style={{ 
                  width: '48px', height: '48px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--success-light)', 
                  color: 'var(--success)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>✓</div>
                <div style={{ fontSize: 'var(--font-base)', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Report Generated Successfully
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
                  Your custom audit report is ready to download.
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Toast System */}
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
