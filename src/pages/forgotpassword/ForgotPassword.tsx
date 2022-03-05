/* eslint-disable */
import React, { useEffect } from 'react';
import rt from '../../assets/img/rieicon.png';
import { paths } from '../../utils/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThunkAppDispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
// import { AlertNote } from '../../components/shared/Common';
import { SelectChangeEvent } from '@mui/material/Select';
import { getIsLoading } from '../../redux/reducers/loaderSlice';
import { ButtonAction, InputField } from '../../components/shared/Common';

type PayLoad = {
  status: boolean;
  message: string;
};

const ForgotPassword = () => {
  const dispatch: ThunkAppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthorized } = useSelector((state: RootState) => state.auth);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    if (isAuthorized) {
      navigate('/profile');
    }
  }, [isAuthorized]);
  
  const [loginDetails, setLoginDetails] = useState({
    email: ''
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
    console.log(e);
  };

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
        <form onSubmit={handleSubmit}>
          <InputField
            name="email"
            label="Email-Address"
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <ButtonAction name="Send link" type="submit" />
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

export default ForgotPassword;
