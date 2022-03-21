import React from 'react';
// import { NavbarAdmin } from '../../components/admin/NavbarAdmin';
import Sidebar from '../Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="md:grid md:grid-cols-12">
      <div className=" md:col-span-3">
        <Sidebar />
      </div>

      {/* <NavbarAdmin /> */}
      <div className="ml-2 md:col-span-9 overflow-y-scroll max-h-screen">{children}</div>
    </div>
  );
};

export default AdminLayout;
