import React from 'react';
import rt from '../../assets/img/rt.png';
import { paths } from '../../utils/constants';

const Signin = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 homebg">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <div className="flex justify-center py-10">
          <a href={paths.HOME}>
            <img
              src={rt}
              alt="logo"
              className="h-10 object-cover sm:h-12 md:h-16 lg:w-100 lg:h-100"
            />
          </a>
        </div>
        <form>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">
              Email-Address
            </label>
            <input
              id="email"
              type="text"
              name="email"
              className="py-2 px-3 border border-gray-500 focus:border-red-500 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-full shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="py-2 px-3 border border-gray-500 focus:border-red-500 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-full shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                {' '}
                Remember me{' '}
              </label>
            </div>
            <a href="#" className="text-sm">
              {' '}
              Forgot your password?{' '}
            </a>
          </div>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <button
              type="button"
              className="flex w-40 justify-center py-2  text-base font-medium rounded-full text-white bg-red-600 hover:bg-gray-700"
            >
              Sign in
            </button>
          </div>
          <div className="mt-6 text-left">
            <span>Dont have an account ? </span>
            <a href={paths.SIGNUP} className="underline font-bold">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
