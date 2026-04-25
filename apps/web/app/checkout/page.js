'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiGet, apiPost } from '@/lib/api';

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>Loading checkout...</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }
    apiGet(`/api/v1/courses/${courseId}`).then(res => {
      setCourse(res.data);
      setLoading(false);
    });
  }, [courseId]);

  useEffect(() => {
    // Load Razorpay script
    if (typeof window !== 'undefined' && !document.getElementById('razorpay-script')) {
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  async function handlePay() {
    if (!course) return;
    setProcessing(true);
    setError('');

    // Create Razorpay order
    const orderRes = await apiPost('/api/v1/payments/razorpay/order', {
      courseId: course._id,
      amount: course.priceInr || course.price,
    });

    if (orderRes.error) {
      setError(orderRes.error.message);
      setProcessing(false);
      return;
    }

    const order = orderRes.data?.order || orderRes.data;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || order.key_id,
      amount: order.amount,
      currency: order.currency || 'INR',
      name: 'Startup India Incubation',
      description: course.title,
      order_id: order.id || order.orderId,
      handler: async function (response) {
        // Verify payment — field names must match backend validation schema
        const verifyRes = await apiPost('/api/v1/payments/razorpay/verify', {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });

        if (verifyRes.error) {
          setError('Payment verification failed. Please contact support.');
          setProcessing(false);
        } else {
          router.push(`/learn/${course._id}`);
        }
      },
      modal: {
        ondismiss: function () {
          setProcessing(false);
        },
      },
      prefill: {},
      theme: { color: '#1f2937' },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      setError('Payment system is loading. Please try again.');
      setProcessing(false);
    }
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (!courseId || !course) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          No course selected
        </h1>
        <a href="/courses" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          Browse courses →
        </a>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <style dangerouslySetInnerHTML={{ __html: `
        .checkout-container {
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .checkout-card {
          background: #fff;
          border-radius: 24px;
          padding: 3rem;
          maxWidth: 480px;
          width: 100%;
          border: 1px solid #eee;
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
          position: relative;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #666;
          font-size: 0.85rem;
          text-decoration: none;
          margin-bottom: 2rem;
          transition: color 0.2s;
        }
        .back-link:hover { color: #000; }
        
        @media (max-width: 640px) {
          .checkout-container { padding: 1rem; }
          .checkout-card { padding: 2rem 1.5rem; border-radius: 20px; }
          .checkout-card h1 { font-size: 1.35rem !important; }
        }
      `}} />
      
      <div className="checkout-card">
        <Link href={`/courses/${course.slug || course._id}`} className="back-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Course
        </Link>
        
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Checkout</h1>

        <div
          style={{
            background: '#f8f9fa',
            borderRadius: 16,
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid #f1f3f5'
          }}
        >
          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#7A1F2B', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', display: 'block' }}>Course Seleted</span>
          <h3 style={{ fontWeight: 700, color: '#111', fontSize: '1.1rem', lineHeight: 1.4 }}>{course.title}</h3>
          {course.category && (
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>{course.category}</p>
          )}
        </div>

        <div style={{ spaceY: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', fontSize: '0.95rem' }}>
            <span style={{ color: '#666' }}>Subtotal</span>
            <span style={{ fontWeight: 600, color: '#111' }}>₹{course.priceInr || course.price}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderTop: '1px solid #eee', fontSize: '1.1rem' }}>
            <span style={{ fontWeight: 800, color: '#111' }}>Total Amount</span>
            <span style={{ fontWeight: 800, color: '#7A1F2B', fontSize: '1.4rem' }}>
              ₹{course.priceInr || course.price}
            </span>
          </div>
        </div>

        {error && (
          <div style={{ background: '#fff5f5', color: '#e03131', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '1.5rem', border: '1px solid #ffc9c9' }}>
            {error}
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={processing}
          style={{
            width: '100%',
            padding: '1rem',
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: '14px',
            fontWeight: 700,
            fontSize: '1.05rem',
            cursor: processing ? 'not-allowed' : 'pointer',
            opacity: processing ? 0.6 : 1,
            transition: 'all 0.2s',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
          }}
        >
          {processing ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span className="animate-spin" style={{ width: '18px', height: '18px', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}></span>
              Processing...
            </span>
          ) : `Secure Checkout • ₹${course.priceInr || course.price}`}
        </button>

        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <svg width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center' }}>
            Encrypted Payment Gateway
          </p>
        </div>
      </div>
    </div>
  );
}
