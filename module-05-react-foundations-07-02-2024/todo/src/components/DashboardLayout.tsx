import React, { FC, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/utils';

interface SlotContainerProps {
  children: ReactNode;
}

export const DashboardLayout: FC<SlotContainerProps> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <div className="bg-gray-100 h-screen w-full grid grid-cols-6 gap-3 relative">
      <aside
        id="desktop-sidebar"
        className={cn(
          'bg-red-100 h-screen hidden sm:block sm:flex sm:flex-col col-span-2 w-72 flex-col gap-3 transition-all duration-300 ease-in-out',
        )}
      >
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/search">Search</Link>
        <Link to="/profile">Profile</Link>
      </aside>

      <aside
        id="mobile-sidebar"
        className={cn(
          'bg-green-100 h-screen sm:hidden col-span-2 w-auto flex flex-col gap-3 transition-all duration-300 ease-in-out',
          isMenuOpen ? 'block' : 'hidden',
        )}
      >
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/search">Search</Link>
        <Link to="/profile">Profile</Link>
      </aside>

      <button
        className="absolute block sm:hidden top-3 left-3 bg-blue-500 rounded-full px-2 py-1.5"
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        Open menu
      </button>
      <div className="col-span-4 mt-16 mx-3">{children}</div>
    </div>
  );
};
