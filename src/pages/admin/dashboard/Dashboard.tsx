import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getOrganizers, getUsers } from '../../../redux/actions/admin';
import { getEvents } from '../../../redux/actions/events';
import { useAppSelector, useAppThunkDispatch } from '../../../redux/store';
import { paths } from '../../../utils/constants';

const Dashboard = () => {
  const dispatch = useAppThunkDispatch();

  const { events } = useAppSelector((state) => state.events);
  const { organizers, users } = useAppSelector((state) => state.admin);
  useEffect(() => {
    (async () => {
      return (await dispatch(getEvents({}))) as unknown;
    })()
      .then((ress) => {
        console.log(ress);
      })
      .catch((err) => {
        console.error(err);
      });
    (async () => {
      return (await dispatch(getOrganizers({}))) as unknown;
    })()
      .then((ress) => {
        console.log(ress);
      })
      .catch((err) => {
        console.error(err);
      });
    (async () => {
      return (await dispatch(getUsers({}))) as unknown;
    })()
      .then((ress) => {
        console.log(ress);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <AdminLayout>
      <p className="text-3xl font-bold mb-4 mt-6">Dashboard</p>
      <section>
        <div className="flex flex-row flex-nowrap font-rubik">
          <Link
            to={paths.ADMIN_EVENTS}
            className="block p-6 m-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Events
            </h5>
            <p className="font-bold text-2xl text-gray-700 dark:text-gray-400">{events?.length}</p>
          </Link>
          <Link
            to={paths.ADMIN_ORGANIZERS}
            className="block p-6 m-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Organizers
            </h5>
            <p className="font-bold text-2xl text-gray-700 dark:text-gray-400">
              {organizers?.length}
            </p>
          </Link>
          <Link
            to={paths.ADMIN_USERS}
            className="block p-6 m-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Users
            </h5>
            <p className="font-bold text-2xl text-gray-700 dark:text-gray-400">{users?.length}</p>
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
