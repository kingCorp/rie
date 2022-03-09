/* eslint-disable */
import React, { Fragment } from 'react';
import rt from '../../assets/img/rieicon.png';
import { paths } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearState } from '../../redux/reducers/authSlice';
import Popover from '@mui/material/Popover';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './index.css';
import { Link } from 'react-router-dom';
import Auth from '../../middleware/storage';

export const NavbarAdmin = () => {
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
    navigate(paths.ADMIN);
  };
  return (
    <Fragment>
      <nav className="bg-white border-gray-200 px-5  md:px-2 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-end items-center mx-auto">
          <div className="flex md:order-2">
            {!Auth.isAuthenticated() && (
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
        </div>
      </nav>
    </Fragment>
  );
};
