import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51N...YOUR_TEST_KEY...'); // Replace with your Stripe publishable key

const CheckoutForm = ({ amount, onSuccess, bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call your backend to create a PaymentIntent
      const res = await fetch(`${API_BASE}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount }) // Amount is already in dollars
      });

      if (!res.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Update booking status to paid
        try {
          await fetch(`${API_BASE}/api/booking/${bookingId}/pay`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
        } catch (updateError) {
          console.error('Failed to update booking status:', updateError);
        }
        setSuccess(true);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) return <div className="text-green-600 font-bold text-center py-4">Payment Successful!</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border border-gray-300 rounded-lg p-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
      >
        {loading ? 'Processing Payment...' : `Pay $${amount}`}
      </button>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
    </form>
  );
};

const StripeCheckoutButton = ({ amount, onSuccess, bookingId }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} onSuccess={onSuccess} bookingId={bookingId} />
  </Elements>
);

export default StripeCheckoutButton;
