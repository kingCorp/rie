import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from '../../utils/constants';
const ErrorPage = () => {
  return (
    <div className="text-center">
      <p className="text-6xl font-bold mt-12"> 404</p>
      <p className="text-3xl font-bold">page not found</p>
      <div className="flex justify-center">
        <p className="mt-14 text-white bg-gray-800 hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700">
          <Link to={paths.HOME}>HOME</Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
