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
    <div
      style={{
        minHeight: '100vh',
        background: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: '2.5rem',
          maxWidth: 450,
          width: '100%',
          border: '1px solid #e5e7eb',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Checkout</h1>

        <div
          style={{
            background: '#f9fafb',
            borderRadius: 12,
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <h3 style={{ fontWeight: 600, marginBottom: 4 }}>{course.title}</h3>
          {course.category && (
            <span style={{ fontSize: '0.7rem', color: '#3b82f6' }}>{course.category}</span>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.75rem 0',
            borderTop: '1px solid #e5e7eb',
            fontSize: '0.9rem',
          }}
        >
          <span style={{ color: '#6b7280' }}>Course Price</span>
          <span style={{ fontWeight: 600 }}>₹{course.priceInr || course.price}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.75rem 0',
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
            fontSize: '1rem',
          }}
        >
          <span style={{ fontWeight: 700 }}>Total</span>
          <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>
            ₹{course.priceInr || course.price}
          </span>
        </div>

        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '1rem' }}>{error}</p>
        )}

        <button
          onClick={handlePay}
          disabled={processing}
          style={{
            width: '100%',
            marginTop: '1.5rem',
            padding: '0.85rem',
            background: '#1f2937',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: '1rem',
            cursor: processing ? 'not-allowed' : 'pointer',
            opacity: processing ? 0.6 : 1,
          }}
        >
          {processing ? 'Processing...' : `Pay ₹${course.priceInr || course.price}`}
        </button>

        <p
          style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', marginTop: '1rem' }}
        >
          Secured by Razorpay. You will be enrolled automatically after payment.
        </p>
      </div>
    </div>
  );
}
