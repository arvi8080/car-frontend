import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarOwner from '../../components/Owner/NavbarOwner'
import Sidebar from '../../components/Owner/Sidebar'

const Layout = () => {
  return (
    <div className='flex flex-col'>
      <NavbarOwner />
      <div className='flex'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout