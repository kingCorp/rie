/* eslint-disable */
import React, { useEffect } from 'react';
import rt from '../../assets/img/rieicon.png';
import { ButtonAction, InputField, SelectField } from '../../components/shared/Common';
import { paths } from '../../utils/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../redux/actions/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThunkAppDispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
// import { AlertNote } from '../../components/shared/Common';
import { SelectChangeEvent } from '@mui/material/Select';
import { toast } from 'react-toastify';
import ForgotPassword from '../forgotpassword/ForgotPassword';

type PayLoad = {
  status: boolean;
  message: string;
};
interface LocationState {
  currentPath: string;
}

const Signin = () => {
  const dispatch: ThunkAppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPath } = (location.state as LocationState) || { currentPath: false };
  const { isAuthorized } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.loader);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const [selectValue, setSelectValue] = useState('user');
  const handleSelect = (e: SelectChangeEvent) => {
    setSelectValue(e.target.value as string);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(signInMember(loginDetails, selectValue));
    console.log(res);
    if (res) {
      navigate(paths.PROFILE);
      return;
    }
    await dispatch(signInUser({ data: loginDetails, userType: selectValue }))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          toast.success(payload.message);
          currentPath ? navigate(currentPath) : navigate('/profile');
        } else {
          toast.error(payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 homebg">
      <ForgotPassword handleClose={handleClose} open={open} userType={selectValue} />
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
        <form onSubmit={handleSubmit}>
          <InputField
            name="email"
            label="Email-Address"
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
          <SelectField
            label="Are you an Event Organizer?"
            value={selectValue}
            onChange={handleSelect}
          />
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

            <a
              className="text-sm cursor-pointer"
              onClick={(e) => {
                handleOpen();
              }}
            >
              {' '}
              Forgot your password?{' '}
            </a>
          </div>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            {isLoading ? (
              <ButtonAction name="Sign in" type="submit" disabled loading />
            ) : (
              <ButtonAction name="Sign in" type="submit" />
            )}
          </div>
          <div className="mt-6 text-left">
            <span>Dont have an account ? </span>
            <a href={paths.SIGNUP} className="underline font-bold">
              Sign up
            </a>
          </div>
        </form>
      </div>
      {isLoading && <Loader size={50} />}
    </div>
  );
};

export default Signin;
