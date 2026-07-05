import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { EmptyState } from '../components/ui/EmptyState';
import { 
  CreditCard, Plus, Shield, MapPin, 
  Settings, History, AlertTriangle, Check, Trash2, Edit, Globe
} from 'lucide-react';

export function PaymentMethods() {
  const [toast, setToast] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [isEditTaxModalOpen, setIsEditTaxModalOpen] = useState(false);
  
  // Mock Boolean for Demo Payment Failure Warning Card
  const [hasPaymentFailed, setHasPaymentFailed] = useState(true);

  // Mock list of payment methods
  const [cards, setCards] = useState([
    { id: '1', brand: 'Visa', last4: '4567', holder: 'Jessica Pearson', exp: '06/2028', isDefault: true },
    { id: '2', brand: 'Mastercard', last4: '7812', holder: 'Jessica Pearson', exp: '11/2027', isDefault: false },
    { id: '3', brand: 'American Express', last4: '9918', holder: 'Jessica Pearson', exp: '09/2029', isDefault: false }
  ]);

  // Form states
  const [newCard, setNewCard] = useState({ name: '', number: '', exp: '', cvv: '', zip: '', country: 'India' });
  const [billingAddress, setBillingAddress] = useState({
    org: 'Pearson Hardman',
    contact: 'Jessica Pearson',
    street: '123 Innovation Drive',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400001',
    country: 'India'
  });
  const [taxInfo, setTaxInfo] = useState({
    id: 'US-98XXXXXXX',
    region: 'Maharashtra',
    status: 'Verified',
    vatExempt: 'No'
  });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    const last4 = newCard.number.slice(-4) || '1234';
    const brand = newCard.number.startsWith('3') ? 'American Express' : newCard.number.startsWith('5') ? 'Mastercard' : 'Visa';
    
    const addedCard = {
      id: Date.now().toString(),
      brand,
      last4,
      holder: newCard.name || 'Jessica Pearson',
      exp: newCard.exp || '12/2030',
      isDefault: cards.length === 0
    };

    setCards([...cards, addedCard]);
    setIsAddModalOpen(false);
    setNewCard({ name: '', number: '', exp: '', cvv: '', zip: '', country: 'India' });
    showToast(`${brand} ending in ${last4} added successfully!`, 'success');
  };

  const handleRemoveCard = (id) => {
    const cardToRemove = cards.find(c => c.id === id);
    if (cardToRemove?.isDefault) {
      showToast('Cannot remove the default payment method.', 'warning');
      return;
    }
    setCards(cards.filter(c => c.id !== id));
    showToast('Payment method removed successfully.', 'success');
  };

  const handleSetDefault = (id) => {
    setCards(cards.map(c => ({
      ...c,
      isDefault: c.id === id
    })));
    showToast('Default payment method updated.', 'success');
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setIsEditAddressModalOpen(false);
    showToast('Billing address updated successfully.', 'success');
  };

  const handleSaveTax = (e) => {
    e.preventDefault();
    setIsEditTaxModalOpen(false);
    showToast('Tax information updated successfully.', 'success');
  };

  const defaultCard = cards.find(c => c.isDefault);
  const secondaryCards = cards.filter(c => !c.isDefault);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Payment Methods</h1>
        <p className="page-subtitle">Manage payment methods, billing addresses, and tax information.</p>
      </div>

      {/* Payment Failure Warning Card */}
      {hasPaymentFailed && (
        <div style={{
          backgroundColor: 'var(--danger-light)',
          border: '1px solid var(--danger)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4) var(--space-6)',
          marginBottom: 'var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <AlertTriangle color="var(--danger)" size={24} />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--font-sm)' }}>Payment Failed</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-xs)' }}>We couldn't process your last payment. Please update your payment method.</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Button variant="danger" size="sm" onClick={() => setIsAddModalOpen(true)}>Update Payment Method</Button>
            <Button variant="ghost" size="sm" onClick={() => setHasPaymentFailed(false)} style={{ color: 'var(--danger)' }}>Dismiss</Button>
          </div>
        </div>
      )}

      {cards.length === 0 ? (
        <Card style={{ marginBottom: 'var(--space-8)' }}>
          <EmptyState
            icon={CreditCard}
            title="No payment methods saved"
            description="Add a payment method to pay for your subscription."
            action={
              <Button variant="primary" icon={Plus} onClick={() => setIsAddModalOpen(true)}>
                Add Payment Method
              </Button>
            }
          />
        </Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)', alignItems: 'start', marginBottom: 'var(--space-8)' }}>
          
          {/* Left Column: Cards List & Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            {/* Primary Payment Method */}
            {defaultCard && (
              <Card>
                <CardHeader title="Primary Payment Method" description="This card is used to charge your subscription by default." />
                <CardContent style={{ padding: 'var(--space-6)' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, var(--text-primary) 0%, #1e293b 100%)',
                    color: 'var(--text-inverse)',
                    padding: 'var(--space-6)',
                    borderRadius: 'var(--radius-lg)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
                    marginBottom: 'var(--space-4)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
                      <div style={{ fontSize: 'var(--font-lg)', fontWeight: 700, letterSpacing: '0.05em' }}>{defaultCard.brand}</div>
                      <Badge variant="primary" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                        Default
                      </Badge>
                    </div>
                    <div style={{ fontSize: 'var(--font-xl)', fontWeight: 600, letterSpacing: '0.15em', marginBottom: 'var(--space-6)' }}>
                      ••••  ••••  ••••  {defaultCard.last4}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6, marginBottom: '2px' }}>Cardholder</div>
                        <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{defaultCard.holder}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6, marginBottom: '2px' }}>Expires</div>
                        <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{defaultCard.exp}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <Button variant="secondary" style={{ flex: 1 }} onClick={() => setIsAddModalOpen(true)}>Replace Card</Button>
                    <Button variant="ghost" disabled={cards.length === 1} style={{ color: 'var(--danger)' }} onClick={() => handleRemoveCard(defaultCard.id)}>Remove</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Saved Payment Methods */}
            <Card>
              <CardHeader title="Saved Payment Methods" description="Other cards on file for backup or alternative billing." />
              <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {secondaryCards.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-4)', color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>
                    No backup payment methods saved.
                  </div>
                ) : (
                  secondaryCards.map(card => (
                    <div key={card.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div style={{ backgroundColor: 'var(--bg)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
                          {card.brand.substring(0, 4).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>
                            {card.brand} ending in {card.last4}
                          </div>
                          <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
                            Expires {card.exp}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <Button variant="ghost" size="sm" onClick={() => handleSetDefault(card.id)}>Set Default</Button>
                        <Button variant="ghost" size="sm" style={{ color: 'var(--danger)', padding: '4px' }} onClick={() => handleRemoveCard(card.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                <Button variant="secondary" style={{ width: '100%', marginTop: 'var(--space-2)' }} icon={Plus} onClick={() => setIsAddModalOpen(true)}>
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Recent Payment Activity Timeline */}
            <Card>
              <CardHeader title="Recent Payment Activity" />
              <CardContent style={{ padding: 'var(--space-6)' }}>
                <div style={{ position: 'relative', paddingLeft: 'var(--space-6)' }}>
                  <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border)' }}></div>
                  
                  <div style={{ position: 'relative', marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                      <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--success)', border: '2px solid var(--surface)' }}></div>
                      <div>
                        <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Visa charged (₹16,599)</div>
                        <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Successful</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>July 12, 2025</div>
                  </div>

                  <div style={{ position: 'relative', marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                      <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--success)', border: '2px solid var(--surface)' }}></div>
                      <div>
                        <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Visa charged (₹16,599)</div>
                        <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Successful</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>June 12, 2025</div>
                  </div>

                  <div style={{ position: 'relative', marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                      <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--surface)' }}></div>
                      <div>
                        <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Payment method updated</div>
                        <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Visa ending 4567</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>May 20, 2025</div>
                  </div>

                  <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                      <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--surface)' }}></div>
                      <div>
                        <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Mastercard added</div>
                        <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Secondary card</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>April 12, 2025</div>
                  </div>

                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column: Address, Tax Info, Preferences */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            {/* Billing Address */}
            <Card>
              <CardHeader title="Billing Address" description="Used on invoices generated for this organization." />
              <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>Organization Name</div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{billingAddress.org}</div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>Billing Contact</div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{billingAddress.contact}</div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>Street</div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{billingAddress.street}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>City</div>
                    <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{billingAddress.city}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>State</div>
                    <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{billingAddress.state}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>ZIP / Postal Code</div>
                    <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{billingAddress.zip}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>Country</div>
                    <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{billingAddress.country}</div>
                  </div>
                </div>
                <Button variant="secondary" style={{ marginTop: 'var(--space-2)', width: '100%' }} icon={MapPin} onClick={() => setIsEditAddressModalOpen(true)}>Edit Address</Button>
              </CardContent>
            </Card>

            {/* Tax Information */}
            <Card>
              <CardHeader title="Tax Information" description="Organization tax and VAT details." />
              <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>Tax ID / EIN</div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{taxInfo.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>Tax Region</div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{taxInfo.region}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>Tax Status</div>
                    <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={14} color="var(--success)" /> {taxInfo.status}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>VAT Exempt</div>
                    <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{taxInfo.vatExempt}</div>
                  </div>
                </div>
                <Button variant="secondary" style={{ marginTop: 'var(--space-2)', width: '100%' }} icon={Shield} onClick={() => setIsEditTaxModalOpen(true)}>Edit Tax Information</Button>
              </CardContent>
            </Card>

            {/* Payment Preferences */}
            <Card>
              <CardHeader title="Payment Preferences" description="Global preferences for organization transactions." />
              <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Auto Pay</div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Automatically charge subscription renewal</div>
                  </div>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Reminder Emails</div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Notify 3 days before next charge</div>
                  </div>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Invoice Delivery</div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Send copies to contact email</div>
                  </div>
                  <Badge variant="default">Email</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>Preferred Currency</div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Payments billed in</div>
                  </div>
                  <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600 }}>INR (₹)</span>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginBottom: '2px' }}>Billing Email</div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>billing@pearsonhardman.com</div>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>
      )}

      {/* Add Payment Method Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Payment Method"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddCard}>Save Payment Method</Button>
          </>
        }
      >
        <form onSubmit={handleAddCard} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <Input 
            label="Cardholder Name" 
            placeholder="Jessica Pearson"
            value={newCard.name}
            onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
            required
          />
          <Input 
            label="Card Number" 
            placeholder="4111 2222 3333 4444"
            maxLength="19"
            value={newCard.number}
            onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Input 
              label="Expiry Date" 
              placeholder="MM/YY"
              maxLength="5"
              value={newCard.exp}
              onChange={(e) => setNewCard({ ...newCard, exp: e.target.value })}
              required
            />
            <Input 
              label="CVV" 
              placeholder="123"
              maxLength="4"
              value={newCard.cvv}
              onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Input 
              label="Billing ZIP / Postal Code" 
              placeholder="400001"
              value={newCard.zip}
              onChange={(e) => setNewCard({ ...newCard, zip: e.target.value })}
              required
            />
            <Input 
              label="Country" 
              placeholder="India"
              value={newCard.country}
              onChange={(e) => setNewCard({ ...newCard, country: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Edit Address Modal */}
      <Modal
        isOpen={isEditAddressModalOpen}
        onClose={() => setIsEditAddressModalOpen(false)}
        title="Edit Billing Address"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsEditAddressModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSaveAddress}>Save Address</Button>
          </>
        }
      >
        <form onSubmit={handleSaveAddress} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <Input 
            label="Organization Name" 
            value={billingAddress.org}
            onChange={(e) => setBillingAddress({ ...billingAddress, org: e.target.value })}
            required
          />
          <Input 
            label="Billing Contact" 
            value={billingAddress.contact}
            onChange={(e) => setBillingAddress({ ...billingAddress, contact: e.target.value })}
            required
          />
          <Input 
            label="Street Address" 
            value={billingAddress.street}
            onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Input 
              label="City" 
              value={billingAddress.city}
              onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
              required
            />
            <Input 
              label="State / Province" 
              value={billingAddress.state}
              onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Input 
              label="ZIP / Postal Code" 
              value={billingAddress.zip}
              onChange={(e) => setBillingAddress({ ...billingAddress, zip: e.target.value })}
              required
            />
            <Input 
              label="Country" 
              value={billingAddress.country}
              onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Edit Tax Information Modal */}
      <Modal
        isOpen={isEditTaxModalOpen}
        onClose={() => setIsEditTaxModalOpen(false)}
        title="Edit Tax Information"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsEditTaxModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSaveTax}>Save Tax Information</Button>
          </>
        }
      >
        <form onSubmit={handleSaveTax} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <Input 
            label="Tax ID / EIN" 
            value={taxInfo.id}
            onChange={(e) => setTaxInfo({ ...taxInfo, id: e.target.value })}
            required
          />
          <Input 
            label="Tax Region" 
            value={taxInfo.region}
            onChange={(e) => setTaxInfo({ ...taxInfo, region: e.target.value })}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div className="input-group">
              <label className="input-label">Tax Status</label>
              <select 
                className="input-field"
                value={taxInfo.status}
                onChange={(e) => setTaxInfo({ ...taxInfo, status: e.target.value })}
              >
                <option value="Verified">Verified</option>
                <option value="Pending">Pending Verification</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">VAT Exempt</label>
              <select 
                className="input-field"
                value={taxInfo.vatExempt}
                onChange={(e) => setTaxInfo({ ...taxInfo, vatExempt: e.target.value })}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        </form>
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
