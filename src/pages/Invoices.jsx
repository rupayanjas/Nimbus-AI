import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { EmptyState } from '../components/ui/EmptyState';
import { 
  FileText, Download, Eye, Search, 
  CreditCard, CheckCircle, ArrowUpRight, DollarSign, Filter
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const MOCK_INVOICES = [
  { id: 'INV-1045', issueDate: 'August 12, 2025', period: 'August 2025', amount: 16599, status: 'Pending', method: 'Visa ****4567' },
  { id: 'INV-1044', issueDate: 'July 12, 2025', period: 'July 2025', amount: 16599, status: 'Paid', method: 'Visa ****4567' },
  { id: 'INV-1043', issueDate: 'June 12, 2025', period: 'June 2025', amount: 16599, status: 'Paid', method: 'Visa ****4567' },
  { id: 'INV-1042', issueDate: 'May 12, 2025', period: 'May 2025', amount: 16599, status: 'Paid', method: 'Visa ****4567' },
  { id: 'INV-1041', issueDate: 'April 12, 2025', period: 'April 2025', amount: 13300, status: 'Paid', method: 'Visa ****4567' },
  { id: 'INV-1040', issueDate: 'March 12, 2025', period: 'March 2025', amount: 9990, status: 'Paid', method: 'Visa ****4567' },
  { id: 'INV-1039', issueDate: 'December 12, 2024', period: 'December 2024', amount: 9990, status: 'Paid', method: 'Visa ****4567' },
  { id: 'INV-1038', issueDate: 'November 12, 2024', period: 'November 2024', amount: 9990, status: 'Paid', method: 'Visa ****4567' },
  { id: 'INV-1037', issueDate: 'October 12, 2024', period: 'October 2024', amount: 9990, status: 'Paid', method: 'Visa ****4567' },
  { id: 'INV-1036', issueDate: 'September 12, 2024', period: 'September 2024', amount: 9990, status: 'Overdue', method: 'MasterCard ****1234' },
  { id: 'INV-1035', issueDate: 'August 12, 2024', period: 'August 2024', amount: 9990, status: 'Paid', method: 'MasterCard ****1234' },
  { id: 'INV-1034', issueDate: 'July 12, 2024', period: 'July 2024', amount: 9990, status: 'Paid', method: 'MasterCard ****1234' },
  { id: 'INV-1033', issueDate: 'December 12, 2023', period: 'December 2023', amount: 7500, status: 'Paid', method: 'Amex ****9876' },
  { id: 'INV-1032', issueDate: 'November 12, 2023', period: 'November 2023', amount: 7500, status: 'Paid', method: 'Amex ****9876' },
];

export function Invoices() {
  const [toast, setToast] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('2025');
  const [sortFilter, setSortFilter] = useState('newest');

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleDownload = (invoiceId) => {
    const invoice = MOCK_INVOICES.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    try {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text('INVOICE', 14, 22);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Invoice Number: ${invoice.id}`, 14, 30);
      doc.text(`Issue Date: ${invoice.issueDate}`, 14, 35);
      doc.text(`Billing Period: ${invoice.period}`, 14, 40);
      doc.text(`Status: ${invoice.status}`, 14, 45);
      
      autoTable(doc, {
        startY: 55,
        head: [['Description', 'Amount']],
        body: [
          ['Subscription Plan', `INR ${invoice.amount.toLocaleString('en-IN')}`],
          ['Tax (0%)', 'INR 0']
        ],
        foot: [['Total', `INR ${invoice.amount.toLocaleString('en-IN')}`]],
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
        footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] }
      });
      
      doc.save(`${invoice.id}.pdf`);
      showToast(`Downloaded PDF for ${invoiceId}`, 'success');
    } catch (error) {
      console.error(error);
      showToast(`Failed to download PDF`, 'danger');
    }
  };

  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'paid': return <Badge variant="success">Paid</Badge>;
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'overdue': return <Badge variant="danger">Overdue</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const filteredInvoices = MOCK_INVOICES.filter((inv) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = inv.id.toLowerCase().includes(searchLower) || inv.period.toLowerCase().includes(searchLower) || inv.status.toLowerCase().includes(searchLower);
    
    const matchesStatus = statusFilter === '' || inv.status.toLowerCase() === statusFilter.toLowerCase();
    
    const matchesYear = yearFilter === '' || inv.issueDate.includes(yearFilter);
    
    return matchesSearch && matchesStatus && matchesYear;
  }).sort((a, b) => {
    if (sortFilter === 'newest') {
      return new Date(b.issueDate) - new Date(a.issueDate);
    } else if (sortFilter === 'oldest') {
      return new Date(a.issueDate) - new Date(b.issueDate);
    } else if (sortFilter === 'highest') {
      return b.amount - a.amount;
    } else if (sortFilter === 'lowest') {
      return a.amount - b.amount;
    }
    return 0;
  });

  const columns = [
    { header: 'Invoice', accessor: 'id', render: (row) => <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.id}</span> },
    { header: 'Issue Date', accessor: 'issueDate' },
    { header: 'Billing Period', accessor: 'period' },
    { header: 'Amount', render: (row) => <span>₹{row.amount.toLocaleString('en-IN')}</span> },
    { header: 'Status', render: (row) => getStatusBadge(row.status) },
    { header: 'Payment Method', render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <CreditCard size={14} color="var(--text-secondary)" /> {row.method}
      </div>
    )},
    { header: 'Download', render: (row) => (
      <Button variant="ghost" size="sm" icon={Download} onClick={() => handleDownload(row.id)}>PDF</Button>
    )},
    { header: 'Actions', render: (row) => (
      <Button variant="secondary" size="sm" icon={Eye} onClick={() => setSelectedInvoice(row)}>View Details</Button>
    )},
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Invoice History</h1>
        <p className="page-subtitle">View billing history, track payment statuses, and download invoices.</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Total Paid This Year</span>
              <DollarSign size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>₹1,98,888</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Outstanding Balance</span>
              <FileText size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>₹16,599</span>
              <Badge variant="warning">Pending</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Last Payment</span>
              <CheckCircle size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>₹16,599</div>
            <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>July 12, 2025</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>Total Invoices</span>
              <FileText size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>{MOCK_INVOICES.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Table Section */}
      <Card style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-light)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="input-field" 
              style={{ paddingLeft: '32px', width: '100%' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <select className="input-field" style={{ minWidth: '120px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Status: All</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <select className="input-field" style={{ minWidth: '120px' }} value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
              <option value="">Year: All</option>
              <option value="2025">Year: 2025</option>
              <option value="2024">Year: 2024</option>
              <option value="2023">Year: 2023</option>
            </select>
            <select className="input-field" style={{ minWidth: '140px' }} value={sortFilter} onChange={(e) => setSortFilter(e.target.value)}>
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="highest">Sort: Highest Amount</option>
              <option value="lowest">Sort: Lowest Amount</option>
            </select>
          </div>
        </div>

        {filteredInvoices.length > 0 ? (
          <Table columns={columns} data={filteredInvoices} />
        ) : (
          <EmptyState 
            icon={FileText} 
            title="No invoices found." 
            description="Adjust your filters or search query to find invoices."
            action={<Button variant="secondary" onClick={() => { setSearchQuery(''); setStatusFilter(''); setYearFilter(''); }}>Clear Filters</Button>}
          />
        )}
      </Card>

      {/* Payment History Timeline */}
      <Card>
        <CardHeader title="Payment History" />
        <CardContent style={{ padding: 'var(--space-6)' }}>
          <div style={{ position: 'relative', paddingLeft: 'var(--space-6)' }}>
            <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border)' }}></div>
            
            <div style={{ position: 'relative', marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--success)', border: '2px solid var(--surface)' }}></div>
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Payment Processed</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}><CreditCard size={12}/> Visa ****4567</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>₹16,599</div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>July 12, 2025</div>
              </div>
            </div>

            <div style={{ position: 'relative', marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--success)', border: '2px solid var(--surface)' }}></div>
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Payment Processed</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}><CreditCard size={12}/> Visa ****4567</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>₹16,599</div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>June 12, 2025</div>
              </div>
            </div>

            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--surface)' }}></div>
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Subscription Upgraded</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowUpRight size={12}/> Growth Plan</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>₹16,599</div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>May 12, 2025</div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Invoice Details Modal */}
      <Modal 
        isOpen={!!selectedInvoice} 
        onClose={() => setSelectedInvoice(null)} 
        title="Invoice Details"
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelectedInvoice(null)}>Close</Button>
            <Button variant="primary" icon={Download} onClick={() => { handleDownload(selectedInvoice?.id); setSelectedInvoice(null); }}>Download PDF</Button>
          </>
        }
      >
        {selectedInvoice && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xl)', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedInvoice.id}</div>
                <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Pearson Hardman</div>
              </div>
              {getStatusBadge(selectedInvoice.status)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', backgroundColor: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Issue Date</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{selectedInvoice.issueDate}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Due Date</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{selectedInvoice.issueDate}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Billing Period</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{selectedInvoice.period}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Payment Method</div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CreditCard size={14} /> {selectedInvoice.method}
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '8px' }}>Line Items</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ fontSize: 'var(--font-sm)' }}>Growth Plan (Monthly)</span>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>₹{selectedInvoice.amount.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: 'var(--font-sm)' }}>Tax (0%)</span>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>₹0</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px' }}>
                <span style={{ fontSize: 'var(--font-base)', fontWeight: 600 }}>Total</span>
                <span style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--primary)' }}>₹{selectedInvoice.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
              <strong>Billing Address:</strong><br />
              123 Enterprise Way<br />
              Mumbai, MH 400001<br />
              India
            </div>

          </div>
        )}
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

