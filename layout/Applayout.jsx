import Header from '@/components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="app-layout"> 
      <div className="grid-background"></div>
      <main className="">
        <Header />
        <Outlet />
      </main>
     
    </div>
  );
};

export default AppLayout;
