import React, { useState } from 'react'
import { dummyMyBookingsData, assets } from '../../assets/assets';

const statusColors = {
  confirmed: { color: '#22c55e', bg: '#e7fbe9', icon: assets.check_icon },
  pending: { color: '#d97706', bg: '#fff7e6', icon: assets.cautionIconColored },
  cancelled: { color: '#e74c3c', bg: '#fdeaea', icon: assets.close_icon },
};

const statusTabs = [
  { label: 'All', value: 'all' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Cancelled', value: 'cancelled' },
];

const ManageBooking = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [modal, setModal] = useState(null); // { type: 'details'|'cancel', booking }

  const filteredBookings = dummyMyBookingsData.filter(booking => {
    const matchesSearch = booking.car.brand.toLowerCase().includes(search.toLowerCase()) || booking.car.model.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === 'all' || booking.status === status;
    return matchesSearch && matchesStatus;
  });

  const handleDetails = (booking) => setModal({ type: 'details', booking });
  const handleCancel = (booking) => setModal({ type: 'cancel', booking });
  const closeModal = () => setModal(null);

  return (
    <div style={{ maxWidth: 1050, margin: '2.5rem auto', padding: '2.5rem 1.5rem', background: '#f9fbfd', borderRadius: 18, boxShadow: '0 6px 24px rgba(45,114,217,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2.5rem' }}>
        <img src={assets.listIconColored} alt="Bookings" style={{ height: 44 }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#2d72d9', margin: 0 }}>Manage Bookings</h2>
      </div>
      {/* Tabs for status */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
        {statusTabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setStatus(tab.value)}
            style={{
              padding: '8px 28px',
              borderRadius: 20,
              border: 'none',
              background: status === tab.value ? '#2d72d9' : '#eaf1fb',
              color: status === tab.value ? '#fff' : '#2d72d9',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: status === tab.value ? '0 2px 8px rgba(45,114,217,0.10)' : 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by car brand or model..."
          style={{ padding: '0.7rem 1.2rem', borderRadius: 8, border: '1.5px solid #eaf1fb', fontSize: 16, minWidth: 220 }}
        />
      </div>
      <div style={{ overflowX: 'auto', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#eaf1fb' }}>
              <th style={{ padding: '16px', border: 'none', fontWeight: 600, color: '#2d72d9', fontSize: 16 }}>Car</th>
              <th style={{ padding: '16px', border: 'none', fontWeight: 600, color: '#2d72d9', fontSize: 16 }}>Pickup</th>
              <th style={{ padding: '16px', border: 'none', fontWeight: 600, color: '#2d72d9', fontSize: 16 }}>Return</th>
              <th style={{ padding: '16px', border: 'none', fontWeight: 600, color: '#2d72d9', fontSize: 16 }}>Status</th>
              <th style={{ padding: '16px', border: 'none', fontWeight: 600, color: '#2d72d9', fontSize: 16 }}>Price</th>
              <th style={{ padding: '16px', border: 'none', fontWeight: 600, color: '#2d72d9', fontSize: 16 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: '#aaa', fontSize: 18, padding: '2.5rem 0' }}>No bookings found.</td></tr>
            ) : filteredBookings.map((booking) => (
              <tr key={booking._id} style={{ borderBottom: '1px solid #f0f4fa', transition: 'background 0.2s', background: '#fff', cursor: 'pointer' }}>
                <td style={{ padding: '16px', border: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <img src={booking.car.image} alt={booking.car.model} style={{ width: 56, height: 38, objectFit: 'cover', borderRadius: 6, boxShadow: '0 1px 4px rgba(45,114,217,0.08)' }} />
                  <span style={{ fontWeight: 500, color: '#222' }}>{booking.car.brand} {booking.car.model}</span>
                </td>
                <td style={{ padding: '16px', border: 'none', color: '#444' }}>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                <td style={{ padding: '16px', border: 'none', color: '#444' }}>{new Date(booking.returnDate).toLocaleDateString()}</td>
                <td style={{ padding: '16px', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src={statusColors[booking.status]?.icon} alt={booking.status} style={{ width: 20, height: 20, opacity: 0.8 }} />
                  <span style={{
                    color: statusColors[booking.status]?.color || '#888',
                    background: statusColors[booking.status]?.bg || '#f0f4fa',
                    padding: '6px 16px',
                    borderRadius: 20,
                    fontSize: 15
                  }}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                </td>
                <td style={{ padding: '16px', border: 'none', color: '#2d72d9', fontWeight: 700, fontSize: 16 }}>${booking.price}</td>
                <td style={{ padding: '16px', border: 'none' }}>
                  <button onClick={() => handleDetails(booking)} style={{ background: '#eaf1fb', color: '#2d72d9', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 600, cursor: 'pointer', marginRight: 8 }}>Details</button>
                  {booking.status === 'pending' && (
                    <button onClick={() => handleCancel(booking)} style={{ background: '#fdeaea', color: '#e74c3c', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Details Modal */}
      {modal?.type === 'details' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(45,114,217,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(45,114,217,0.15)', padding: '2.5rem 2rem', minWidth: 340, textAlign: 'center', animation: 'modalPop .5s cubic-bezier(.4,2,.6,1)' }}>
            <img src={modal.booking.car.image} alt="Car" style={{ width: 90, borderRadius: 10, marginBottom: 16 }} />
            <h3 style={{ color: '#2d72d9', marginBottom: 8 }}>{modal.booking.car.brand} {modal.booking.car.model}</h3>
            <div style={{ color: '#444', marginBottom: 8 }}>Pickup: {new Date(modal.booking.pickupDate).toLocaleDateString()}</div>
            <div style={{ color: '#444', marginBottom: 8 }}>Return: {new Date(modal.booking.returnDate).toLocaleDateString()}</div>
            <div style={{ color: statusColors[modal.booking.status]?.color, marginBottom: 8, fontWeight: 600 }}>Status: {modal.booking.status.charAt(0).toUpperCase() + modal.booking.status.slice(1)}</div>
            <div style={{ color: '#2d72d9', fontWeight: 700, fontSize: 18, marginBottom: 18 }}>Price: ${modal.booking.price}</div>
            <button onClick={closeModal} style={{ background: '#2d72d9', color: '#fff', padding: '0.6rem 2rem', border: 'none', borderRadius: 5, fontWeight: 'bold', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
      {/* Cancel Confirmation Modal */}
      {modal?.type === 'cancel' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(45,114,217,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(45,114,217,0.15)', padding: '2.5rem 2rem', minWidth: 340, textAlign: 'center', animation: 'modalPop .5s cubic-bezier(.4,2,.6,1)' }}>
            <img src={assets.cautionIconColored} alt="Cancel" style={{ width: 48, marginBottom: 16 }} />
            <h3 style={{ color: '#e74c3c', marginBottom: 8 }}>Cancel Booking?</h3>
            <p style={{ color: '#444', marginBottom: 24 }}>Are you sure you want to cancel the booking for <b>{modal.booking.car.brand} {modal.booking.car.model}</b>?</p>
            <button onClick={closeModal} style={{ background: '#eaf1fb', color: '#2d72d9', padding: '0.6rem 2rem', border: 'none', borderRadius: 5, fontWeight: 'bold', cursor: 'pointer', marginRight: 12 }}>No</button>
            <button onClick={closeModal} style={{ background: '#e74c3c', color: '#fff', padding: '0.6rem 2rem', border: 'none', borderRadius: 5, fontWeight: 'bold', cursor: 'pointer' }}>Yes, Cancel</button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes modalPop { 0% { transform: scale(0.8); opacity: 0;} 100% { transform: scale(1); opacity: 1;} }
      `}</style>
    </div>
  )
}

export default ManageBooking