import React from 'react';
// import { NavbarAdmin } from '../../components/admin/NavbarAdmin';
import Sidebar from '../Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="md:flex">
      <Sidebar />
      <div>
        {/* <NavbarAdmin /> */}
        <div className="ml-2">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
