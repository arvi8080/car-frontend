import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import {
  calendar_icon_colored,
  location_icon_colored
} from '../assets/assets';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setShowLogin } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  const fetchBookings = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/booking`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Fetch bookings error:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
      <Title title='My Bookings' subTitle='View and manage your all car bookings' align="left" />

      <div>
        {bookings.map((booking, index) => (
          <div key={booking._id} className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border borderColor rounded-lg mb-5 first:mt-12 shadow-md bg-white'>
            
            {/* Car Info */}
            <div className='md:col-span-1'>
              <div className='rounded-md overflow-hidden mb-3'>
                <img src={booking.car.image} alt={`${booking.car.brand}`} className='w-full h-auto aspect-video object-cover' />
              </div>
              <p className='text-lg font-medium mt-2'>{booking.car.brand} {booking.car.model}</p>
              <p className='text-gray-500'>{booking.car.year} · {booking.car.category} · {booking.car.location}</p>
            </div>

            {/* Booking Info */}
            <div className='md:col-span-2'>
              <div className='flex items-center gap-2'>
                <p className='px-3 py-1.5 bg-light rounded text-sm'>Booking #{index + 1}</p>
                <p className={`px-3 py-1 text-xs rounded-full ${
                  booking.status === 'confirmed'
                    ? 'bg-green-400/15 text-green-600'
                    : 'bg-red-400/15 text-red-600'
                }`}>
                  {booking.status}
                </p>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={calendar_icon_colored} alt="Calendar" className='w-4 h-4 mt-1' />
                <div>
                  <p className='text-gray-500'>Rental Period</p>
                  <p>{new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={location_icon_colored} alt="Location" className='w-4 h-4 mt-1' />
                <div>
                  <p className='text-gray-500'>Pick-up Location</p>
                  <p>{booking.car.location}</p>
                </div>
              </div>
            </div>

            {/* Payment & Price Info */}
            <div className='md:col-span-1 flex flex-col justify-between gap-6 text-right'>
              <div>
                <p className='text-gray-500 text-sm'>Total Price</p>
                <h1 className='text-2xl font-semibold text-primary'>{currency}{booking.totalPrice}</h1>
                <p className='text-gray-500 text-xs'>Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Non-functional Pay Now Dropdown */}
              <div className='relative group inline-block text-left'>
                <button className='bg-primary hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded transition duration-300'>
                  Pay Options ▼
                </button>
                <div className='hidden group-hover:block absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10'>
                  <a href="#" className='block px-4 py-2 text-sm hover:bg-gray-100'>Credit / Debit Card</a>
                  <a href="#" className='block px-4 py-2 text-sm hover:bg-gray-100'>UPI / QR</a>
                  <a href="#" className='block px-4 py-2 text-sm hover:bg-gray-100'>Pay Later</a>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
