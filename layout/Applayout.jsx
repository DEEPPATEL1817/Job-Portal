import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>applayout <Outlet /> </div>
  )
}

export default AppLayout