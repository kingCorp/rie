import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { paths } from '../../../utils/constants';

const Dashboard = () => {
  return (
    <AdminLayout>
      <p className="text-3xl font-bold mb-4 mt-6">Dashboard</p>
      <section>
        <div className="flex flex-row flex-nowrap">
          <Link
            to={paths.ADMIN_EVENTS}
            className="block p-6 m-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Events
            </h5>
            <p className="font-bold text-2xl text-gray-700 dark:text-gray-400">1</p>
          </Link>
          <Link
            to={paths.ADMIN_ORGANIZERS}
            className="block p-6 m-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Organizers
            </h5>
            <p className="font-bold text-2xl text-gray-700 dark:text-gray-400">1</p>
          </Link>
          <Link
            to={paths.ADMIN_USERS}
            className="block p-6 m-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Users
            </h5>
            <p className="font-bold text-2xl text-gray-700 dark:text-gray-400">1</p>
          </Link>
          <Link
            to={paths.ADMIN_EVENTS}
            className="block p-6 m-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tickets
            </h5>
            <p className="font-bold text-2xl text-gray-700 dark:text-gray-400">1</p>
          </Link>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Dashboard;
