/* eslint-disable */
import React, { useEffect } from 'react';
import rt from '../../../assets/img/rieicon.png';
import { ButtonAction, InputField, SelectField } from '../../../components/shared/Common';
import { paths } from '../../../utils/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../../redux/actions/auth';
import { useNavigate } from 'react-router-dom';
import { ThunkAppDispatch, RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
// import { AlertNote } from '../../components/shared/Common';
import { SelectChangeEvent } from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { signInAdmin } from '../../../redux/actions/admin';

type PayLoad = {
  status: boolean;
  message: string;
};

const SigninAdmin = () => {
  const dispatch: ThunkAppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthorized } = useSelector((state: RootState) => state.admin);
  const { isLoading } = useSelector((state: RootState) => state.loader);

  useEffect(() => {
    if (isAuthorized) {
      navigate('/dashboard');
    }
  }, [isAuthorized]);
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginDetails.email === '' || loginDetails.password === '') {
      toast('Kindly fill all fields');
      return;
    }
    await dispatch(signInAdmin(loginDetails))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          console.log('success', payload);
          toast.success(payload.message);
        } else {
          console.log('error', payload);
          toast.error(payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 homebg">
      <ToastContainer />
      <div className="text-3xl font-rubik font-bold">Admin Sign In</div>
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <div className="flex justify-center py-10">
          <Link to={paths.HOME}>
            <img
              src={rt}
              alt="logo"
              className="h-10 object-cover sm:h-12 md:h-16 lg:w-100 lg:h-100"
            />
          </Link>
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
          </div>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            {isLoading ? (
              <ButtonAction name="Sign in" type="submit" disabled loading />
            ) : (
              <ButtonAction name="Sign in" type="submit" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninAdmin;
