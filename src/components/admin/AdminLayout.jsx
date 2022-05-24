import React from 'react';
// import { NavbarAdmin } from '../../components/admin/NavbarAdmin';
import Sidebar from '../Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="bg-gray-200 md:grid md:grid-cols-5">
      <div className="bg-white md:col-span-1">
        <Sidebar />
      </div>

      {/* <NavbarAdmin /> */}
      <div className="ml-2 md:col-span-4 overflow-y-scroll max-h-screen md:p-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
