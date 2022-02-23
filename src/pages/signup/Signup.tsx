import React from 'react';
import rt from '../../assets/img/rieicon.png';
import { ButtonAction, InputField } from '../../components/shared/Common';
import { paths } from '../../utils/constants';

const SignUp = () => {
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
          <form>
            <InputField name="fullname" label="Full name" type="text" />
            <InputField name="email" label="Email-Address" type="email" />
            <InputField name="password" label="Password" type="password" />
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <ButtonAction name="Sign up" />
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
