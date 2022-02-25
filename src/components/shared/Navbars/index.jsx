/* eslint-disable */
import React, { Fragment } from 'react';
import rt from '../../../assets/img/rieicon.png';
import { paths } from '../../../utils/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearState } from '../../../redux/reducers/authSlice';
import Popover from '@mui/material/Popover';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './index.css';
import { Link } from 'react-router-dom';
import Auth from '../../../middleware/storage';


export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const Logout = async (e) => {
    console.log('logout');
    await dispatch(clearState());
    localStorage.clear();
    navigate('/');
  };
  return (
    <Fragment>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href={paths.HOME} className="flex">
            <img
              src={rt}
              alt="logo"
              className="h-10 object-cover sm:h-12 md:h-16 lg:w-100 lg:h-100"
            />
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white"></span>
          </a>
          <div className="flex md:order-2">
            {!Auth.isAuthenticated() ? (
              <div>
                <a
                  href={paths.SIGNUP}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
                >
                  Get started
                </a>
                <a
                  href={paths.SIGNIN}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
                >
                  Sign in
                </a>
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
                  <div className='user-modal cursor-pointer'>
                  

                  <Link to={paths.PROFILE} state={{from: "ticket"}}><div className='pop-list pop-list-top'>My Tickets</div></Link>  
                  {Auth?.getRole() === "organizer"  && <Link to={paths.PROFILE} state={{from: "myevent"}}><div className='pop-list'>My Events</div></Link>} 
                  <Link to={paths.PROFILE} state={{from: "booked"}}><div className='pop-list '>Booked Events</div></Link>  
                  <Link to={paths.PROFILE} state={{from: "timeline"}}><div className='pop-list'>Timeline</div></Link>  
                    <div className='pop-list pop-list-bottom' onClick={(e)=>{Logout(e)}}>Sign Out</div>
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
                <a
                  href={paths.HOME}
                  className="block py-2 pr-4 pl-3 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 dark:text-white underline"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href={paths.SELLING}
                  className="block py-2 pr-4 underline pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Selling Hot
                </a>
              </li>
              <li>
                <a
                  href={paths.UPCOMING}
                  className="block py-2 pr-4 pl-3 underline text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Upcoming
                </a>
              </li>
              <li>
                <input
                  type="text"
                  id="email-adress-icon"
                  className="block py-2 pr-4 pl-3 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search events..."
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};
