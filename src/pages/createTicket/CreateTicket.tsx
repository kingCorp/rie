import React from 'react';
import MainLayout from '../../components/MainLayout';
import { ButtonAction, InputField } from '../../components/shared/Common';
import { paths } from '../../utils/constants';

const CreateTicket = () => {
  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 homebg">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <form>
            <InputField name="fullname" label="Full name" type="text" />
            <InputField name="email" label="Email-Address" type="email" />
            <InputField name="password" label="Password" type="password" />
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <ButtonAction name="Sign up" />
            </div>
            <div className="mt-6 text-center">
              <a href={paths.SIGNIN} className="underline font-bold">
                Add ticket
              </a>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateTicket;
