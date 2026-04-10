'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiGet } from '@/lib/api';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/checkout-premium.css';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [now, setNow] = useState(new Date());
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    zip: '',
    email: '',
    upiId: ''
  });

  useEffect(() => {
    setNow(new Date());
    if (!courseId) {
      router.push('/courses');
      return;
    }

    async function fetchCourse() {
      try {
        const res = await apiGet(`/api/v1/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDone = () => {
    // Simulate payment processing
    setIsSuccess(true);
  };

  if (loading) return <div className="checkout-view"><div className="spinner" /></div>;
  if (!course) return <div className="checkout-view">Course not found.</div>;

  const totalAmount = course.priceInr || 55000;

  if (isSuccess) {
    return (
      <div className="checkout-view" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', maxWidth: '500px', padding: '40px' }}
        >
          <motion.div 
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: [200, -20, 0], opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative' }}>
              <Icon name="rocket" size={100} color="#ef4444" />
              <motion.div 
                animate={{ 
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ repeat: Infinity, duration: 1 }}
                style={{ 
                  position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)',
                  width: '40px', height: '60px', background: 'linear-gradient(to bottom, #ef4444, transparent)',
                  borderRadius: '50%', filter: 'blur(10px)', zIndex: -1
                }}
              />
            </div>
          </motion.div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Enrolled Successfully!</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '40px', lineHeight: 1.6 }}>
            Great choice! You are now enrolled in <strong>{course.title}</strong>. Your learning journey starts right now.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button 
              onClick={() => router.push(`/learn/${courseId}`)}
              style={{ 
                background: '#ef4444', color: '#fff', border: 'none', 
                padding: '16px 32px', borderRadius: '16px', fontWeight: 800, 
                fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(239, 68, 68, 0.2)',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}
            >
              START LEARNING <Icon name="play" size={18} color="#fff" />
            </button>
            <button 
              onClick={() => router.push('/my-learning')}
              style={{ 
                background: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0', 
                padding: '16px 32px', borderRadius: '16px', fontWeight: 700, 
                fontSize: '1rem', cursor: 'pointer'
              }}
            >
              GO TO DASHBOARD
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="checkout-view">
      <div className="checkout-wrapper">
        <header className="checkout-header">
          <button className="checkout-back-btn-inner" onClick={() => router.back()}>
            <Icon name="chevronLeft" size={14} color="#ef4444" /> BACK TO EXPLORE
          </button>
          <h1>Payment method</h1>
          <p>Complete your enrollment for the program</p>
        </header>

        <main className="checkout-content">
          
          {/* LEFT: PAYMENT OPTIONS */}
          <section className="payment-options-section">
            <div className="section-title">
              <h2>Payment options</h2>
              <div className="secure-label">
                <Icon name="lock" size={14} color="#94A3B8" /> Secure server
              </div>
            </div>

            {/* Credit Card Option */}
            <div className={`option-card ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
              <div className="option-header">
                <div className="option-radio" />
                <div className="option-info">
                  <h3>Credit / debit card</h3>
                  <p>Secure transfer using your bank account</p>
                </div>
                <div className="card-logos">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" style={{ height: '12px' }} alt="Visa" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" style={{ height: '20px' }} alt="Mastercard" />
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="payment-form-grid">
                  <div className="input-field">
                    <label>First Name</label>
                    <input name="firstName" placeholder="e.g. Rahul" value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="input-field">
                    <label>Last Name</label>
                    <input name="lastName" placeholder="e.g. Sharma" value={formData.lastName} onChange={handleInputChange} />
                  </div>
                  <div className="input-field" style={{ gridColumn: 'span 2' }}>
                    <label>Card number</label>
                    <input name="cardNumber" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleInputChange} />
                  </div>
                  <div className="input-field">
                    <label>Expiration</label>
                    <input name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} />
                  </div>
                  <div className="input-field">
                    <label>CVV</label>
                    <input name="cvv" placeholder="123" value={formData.cvv} onChange={handleInputChange} />
                  </div>
                  <div className="input-field">
                    <label>Postal code</label>
                    <input name="zip" placeholder="400001" value={formData.zip} onChange={handleInputChange} />
                  </div>
                  <div className="input-field">
                    <label>Email</label>
                    <input name="email" placeholder="rahul@example.com" value={formData.email} onChange={handleInputChange} />
                  </div>
                </div>
              )}
            </div>

            {/* UPI Option */}
            <div className={`option-card ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
              <div className="option-header">
                <div className="option-radio" />
                <div className="option-info">
                  <h3>UPI Transaction</h3>
                  <p>Pay using Google Pay, PhonePe, or any UPI ID</p>
                </div>
                <div className="card-logos">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" style={{ height: '18px' }} alt="UPI" />
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div className="payment-form-grid">
                  <div className="input-field" style={{ gridColumn: 'span 2' }}>
                    <label>Enter UPI ID</label>
                    <input name="upiId" placeholder="username@upi" value={formData.upiId} onChange={handleInputChange} />
                  </div>
                </div>
              )}
            </div>

            {/* Paypal Option */}
            <div className={`option-card ${paymentMethod === 'paypal' ? 'active' : ''}`} onClick={() => setPaymentMethod('paypal')}>
              <div className="option-header" style={{ marginBottom: 0 }}>
                <div className="option-radio" />
                <div className="option-info">
                  <h3>Paypal</h3>
                  <p>International payment through the PayPal portal</p>
                </div>
                <div className="card-logos">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" style={{ height: '22px' }} alt="PayPal" />
                </div>
              </div>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                id="terms" 
                style={{ 
                  width: '18px', height: '18px', accentColor: '#ef4444', 
                  cursor: 'pointer', border: '2px solid #ef4444' 
                }} 
              />
              <label htmlFor="terms" style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>
                I agree to the Terms & Conditions and Privacy Policy
              </label>
            </div>
          </section>

          {/* RIGHT: SUMMARY CARD */}
          <aside className="payment-summary">
            <div className="payment-summary-card">
              <h2 className="summary-title">Payment settings</h2>
              
              <div className="plan-info">
                <div className="plan-name">{course.title}</div>
                <div className="plan-desc">With full access to the program curriculum, recorded sessions, and mentorship.</div>
              </div>

              <div className="transaction-details">
                <div className="detail-row">
                  <span>Transaction date:</span>
                  <span>{now.toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <span>Hour:</span>
                  <span>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <div className="price-breakdown">
                <div className="breakdown-row">
                  <span>Subtotal:</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="breakdown-row">
                  <span>Discount:</span>
                  <span>₹0.00</span>
                </div>
                <div className="total-row">
                  <span>Total:</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button className="done-btn" onClick={handleDone}>Done</button>
            </div>
          </aside>

        </main>
      </div>
    </div>
  );
}
