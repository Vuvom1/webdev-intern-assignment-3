import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <header className="bg-blue-700 text-white py-4 px-6 font-bold text-xl shadow">
    Student Score Dashboard
  </header>
);

const SideMenu = () => (
  <aside className="bg-gray-100 dark:bg-gray-900 w-48 min-h-screen p-4">
    <nav className="flex flex-col gap-2">
      <Link to="/dashboard" className="py-2 px-3 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Dashboard</Link>
      <Link to="/search-scores" className="py-2 px-3 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Tìm kiếm điểm</Link>
      <Link to="/report" className="py-2 px-3 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Báo cáo</Link>
    </nav>
  </aside>
);

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <div className="flex flex-1">
      <SideMenu />
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">{children}</main>
    </div>
  </div>
);

export default Layout;
