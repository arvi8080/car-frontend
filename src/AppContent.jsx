import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';
import UserProfile from './pages/UserProfile';
import Footer from './components/Footer';
import Layout from './pages/Owner/Layout';
import Dashboard from './pages/Owner/Dashboard';
import AddCar from './pages/Owner/AddCar';
import ManageCars from './pages/Owner/ManageCars';
import ManageBookings from './pages/Owner/ManageBookings';
import { useAppContext } from './context/AppContext';

const AppContent = () => {
  const { showLogin, setShowLogin } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith('/owner');

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login setShowLogin={setShowLogin} />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default AppContent;
