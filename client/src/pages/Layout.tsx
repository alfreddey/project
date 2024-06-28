import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='h-screen'>
        <div className='h-12 border-b flex justify-center items-center text-xl font-bold text-purple-800'>QUIZ APP</div>
        <Outlet />
    </div>
  )
}

export default Layout