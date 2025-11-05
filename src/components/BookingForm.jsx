import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';
import StripeCheckoutButton from './StripeCheckoutButton';

const BookingForm = ({ car }) => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const currency = import.meta.env.VITE_CURRENCY || '$';
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  const calculateTotalPrice = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * car.pricePerDay : 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate) {
      toast.error('Please select both pickup and return dates');
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      toast.error('Pickup date cannot be in the past');
      return;
    }

    if (end <= start) {
      toast.error('Return date must be after pickup date');
      return;
    }

    setLoading(true);

    try {
      const totalPrice = calculateTotalPrice();

      const response = await fetch(`${API_BASE}/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          car: car._id,
          startDate: formData.startDate,
          endDate: formData.endDate,
          totalPrice
        })
      });

      const data = await response.json();

      if (data.success) {
        setBooking(data.booking);
        setShowPayment(true);
        toast.success('Booking created! Please complete payment.');
      } else {
        toast.error(data.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    toast.success('Payment successful! Booking confirmed.');
    navigate('/my-bookings');
  };

  if (showPayment && booking) {
    return (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">Booking Created Successfully!</h4>
          <div className="text-sm text-green-700 space-y-1">
            <p>Car: {car.brand} {car.model}</p>
            <p>Pickup: {new Date(booking.startDate).toLocaleDateString()}</p>
            <p>Return: {new Date(booking.endDate).toLocaleDateString()}</p>
            <p>Total: {currency}{booking.totalPrice}</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Complete Payment</h4>
          <StripeCheckoutButton amount={booking.totalPrice} onSuccess={handlePaymentSuccess} bookingId={booking._id} />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Return Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            min={formData.startDate || new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
      </div>

      {formData.startDate && formData.endDate && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Price:</span>
            <span className="text-xl font-bold text-primary">
              {currency}{calculateTotalPrice()}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))} days × {currency}{car.pricePerDay}/day
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !formData.startDate || !formData.endDate}
        className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
      >
        {loading ? 'Creating Booking...' : 'Book Now'}
      </button>
    </form>
  );
};

export default BookingForm;
