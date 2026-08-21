import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const LayoutAutenticado = () => {
  const [sidebarAbierto, setSidebarAbierto] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-100">
      <Sidebar abierto={sidebarAbierto} onToggle={() => setSidebarAbierto(!sidebarAbierto)} />
      <div className={`transition-all duration-200 ${sidebarAbierto ? 'ml-60' : 'ml-16'}`}>
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAutenticado;
