import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useWindowSize } from '../hooks/useWindowSize';

const MainLayout = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div className="main-layout theme-transition">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout; 