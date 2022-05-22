/* eslint-disable */
import React, { Fragment } from 'react';
import rt from '../../../assets/img/rieicon.png';
import { paths } from '../../../utils/constants';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearState } from '../../../redux/reducers/authSlice';
import Popover from '@mui/material/Popover';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './index.css';
import { Link } from 'react-router-dom';
import Auth from '../../../middleware/storage';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const Logout = async (e) => {
    await dispatch(clearState());
    localStorage.clear();
    navigate(paths.HOME);
  };
  console.log(location.pathname);
  return (
    <Fragment>
      <nav className="bg-white border-gray-200 px-4  md:px-2 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to={paths.HOME} className="flex">
            <img
              src={rt}
              alt="logo"
              className="h-10 object-cover sm:h-12 md:h-16 lg:w-100 lg:h-100"
            />
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white"></span>
          </Link>

          <div className="flex md:order-2">
            {!Auth.isAuthenticated() ? (
              <div>
                <Link
                  to={paths.SIGNUP}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
                >
                  Sign Up
                </Link>
                <Link
                  to={paths.SIGNIN}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
                >
                  Sign in
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  <AccountCircleOutlinedIcon fontSize="large" />
                </div>

                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  // anchorReference="anchorPosition"
                  // anchorPosition={{ top: 60, left: 1030 }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  sx={{
                    '& .MuiPopover-paper': {
                      borderRadius: '16px',
                    },
                  }}
                >
                  <div className="user-modal cursor-pointer">
                    {Auth?.getRole() === 'organizer' && (
                      <Link to={paths.PROFILE} state={{ from: 'myevent' }}>
                        <div className="pop-list  pop-list-top">My Events</div>
                      </Link>
                    )}
                    {Auth?.getRole() === 'user' && (
                      <Link to={paths.PROFILE} state={{ from: 'ticket' }}>
                        <div className="pop-list pop-list-top">My Tickets</div>
                      </Link>
                    )}
                    <Link to={paths.PROFILE} state={{ from: 'profile' }}>
                      <div className="pop-list ">Profile</div>
                    </Link>
                    <div
                      className="pop-list pop-list-bottom"
                      onClick={(e) => {
                        Logout(e);
                      }}
                    >
                      Sign Out
                    </div>
                  </div>
                </Popover>
              </div>
            )}
            <button
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-4"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-4"
          >
            <ul className="flex flex-col items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <NavLink
                  to={paths.HOME}
                  className={`block py-2 pr-4 pl-3 md:p-0 ${
                    location.pathname === paths.HOME ? 'text-red-700' : ''
                  }`}
                >
                  Home
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to={paths.SELLING}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Selling Hot
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to={paths.EVENTS}
                  className={`block py-2 pr-4 pl-3 md:p-0 ${
                    location.pathname === paths.EVENTS ? 'text-red-700' : ''
                  }`}
                >
                  Events
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to={paths.ABOUT}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink
                  to={paths.UPCOMING}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Upcoming
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};
