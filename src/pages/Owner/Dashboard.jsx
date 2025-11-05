import React from 'react'
import { assets, dummyDashboardData, dummyUserData } from '../../assets/assets';

const Dashboard = () => {
  // Use real dummy data
  const summary = [
    { label: 'Total Cars', value: dummyDashboardData.totalCars, icon: assets.carIconColored },
    { label: 'Total Bookings', value: dummyDashboardData.totalBookings, icon: assets.listIconColored },
    { label: 'Revenue', value: `$${dummyDashboardData.monthlyRevenue}`, icon: assets.dashboardIconColored },
    { label: 'Active Users', value: dummyDashboardData.activeUsers || 128, icon: assets.users_icon },
    { label: 'Pending Approvals', value: dummyDashboardData.pendingApprovals || 7, icon: assets.cautionIconColored },
    { label: 'Support Tickets', value: dummyDashboardData.supportTickets || 3, icon: assets.cautionIconColored },
  ];

  return (
    <div style={{ flex: 1, height: 'calc(100vh - 64px)', overflowY: 'auto', background: 'linear-gradient(135deg, #eaf1fb 0%, #f9fbfd 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.5rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 900, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#2d72d9', letterSpacing: 1, margin: 0, textShadow: '0 2px 8px #eaf1fb' }}>Admin Dashboard</h2>
      </div>
      {/* Animated summary cards with hover effect */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2rem',
        marginBottom: '2.5rem',
        width: '100%',
        maxWidth: 900,
      }}>
        {summary.map((item, idx) => (
          <div key={item.label} style={{
            background: 'linear-gradient(120deg, #f5faff 60%, #eaf1fb 100%)',
            borderRadius: '16px',
            padding: '2rem 2.5rem',
            minWidth: '180px',
            boxShadow: '0 4px 16px rgba(45,114,217,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            justifyContent: 'flex-start',
            border: '1.5px solid #eaf1fb',
            transition: 'box-shadow 0.2s, transform 0.2s',
            cursor: 'pointer',
            animation: `fadeInUp 0.7s cubic-bezier(.4,2,.6,1) ${0.1 + idx * 0.1}s both`,
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(45,114,217,0.13)'; e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(45,114,217,0.08)'; e.currentTarget.style.transform = 'none'; }}
          >
            <img src={item.icon} alt={item.label} style={{ height: 44, filter: 'drop-shadow(0 2px 8px #eaf1fb)' }} />
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#2d72d9', lineHeight: 1 }}>{item.value}</div>
              <div style={{ color: '#555', marginTop: '0.5rem', fontSize: 16 }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 16px rgba(45,114,217,0.08)', display: 'flex', alignItems: 'center', gap: 32, maxWidth: 700, width: '100%', border: '1.5px solid #eaf1fb', marginBottom: 24 }}>
        <img src={assets.dashboardIconColored} alt="Dashboard Overview" style={{ height: 56 }} />
        <div>
          <h3 style={{ marginBottom: 12, fontSize: '1.3rem', color: '#2d72d9', fontWeight: 600 }}>Dashboard Overview</h3>
          <p style={{ color: '#444', fontSize: 16 }}>Here you can manage your cars, view bookings, and track your revenue. Use the sidebar to navigate to different management sections.</p>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default Dashboard