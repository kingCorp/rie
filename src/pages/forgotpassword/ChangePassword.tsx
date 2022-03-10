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
import { toast } from 'react-toastify';
import { Modal } from '@mui/material';
import { changePassword } from '../../redux/actions/auth';

type PayLoad = {
  status: boolean;
  message: string;
};

type Props = {
  handleClose: () => void;
  open: boolean;
  userType: string;
};

const ChangePassword = ({ handleClose, open, userType }: Props) => {
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
    email: '',
    password: '',
    token: '',
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
    await dispatch(changePassword({ data: loginDetails, userType: userType }))
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
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="w-4/5 md:w-1/3 bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 homebg m-auto rounded-xl overflow-hidden mt-44">
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
                id="change-email"
                name="email"
                label="Email-Address"
                type="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              />
              <InputField
                id="change-password"
                name="password"
                label="New Password"
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              />
              <InputField
                id="change-token"
                name="token"
                label="Token"
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              />
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                {isLoading ? (
                  <ButtonAction name="Change Password" type="submit" disabled loading />
                ) : (
                  <ButtonAction name="Change Password" type="submit" />
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
        </div>
      </Modal>
    </>
  );
};

export default ChangePassword;
