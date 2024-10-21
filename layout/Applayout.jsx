import Header from '@/components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="app-layout"> 
      <div className="grid-background"></div>
      <main className="content">
        <Header />
        <Outlet />
      </main>
      <footer className="footer"> 
        made by deep
      </footer>
    </div>
  );
};

export default AppLayout;
