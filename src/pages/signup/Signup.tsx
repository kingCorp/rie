import React, { useState } from 'react';
import rt from '../../assets/img/rieicon.png';
import { ButtonAction, InputField, SelectField } from '../../components/shared/Common';
import { paths } from '../../utils/constants';
import { useAppThunkDispatch } from '../../redux/store';
import { signUpUser } from '../../redux/actions/auth';
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
type PayLoad = {
  status: boolean;
  message: string;
};
const SignUp = () => {
  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();
  const [signUpDetails, setSignUpDetails] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
  });

  const [selectValue, setSelectValue] = useState('user');

  const handleSelect = (e: SelectChangeEvent) => {
    setSelectValue(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpDetails({
      ...signUpDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submits');
    e.preventDefault();

    await dispatch(signUpUser({ data: signUpDetails, userType: selectValue }))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          console.log(payload.message);
          navigate(paths.SIGNIN);
        } else {
          console.log(payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 homebg">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <div className="flex justify-center py-3">
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
              name="fullname"
              label="Full name"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
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
            <InputField
              name="phone"
              label="Phone"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <SelectField
              label="Are you a show promoter?"
              value={selectValue}
              onChange={handleSelect}
            />
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <ButtonAction name="Sign up" type="submit" />
            </div>
            <div className="mt-6 text-center">
              <a href={paths.SIGNIN} className="underline font-bold">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
