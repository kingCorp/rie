import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../shared/Footer';
import { Navbar } from '../shared/Navbars';
import back from '../../assets/img/back.svg';
import { paths } from '../../utils/constants';

export default function MainLayout(props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) {
  const navigate = useNavigate();
  const home = window.location.pathname;
  console.log(home, paths.HOME);
  return (
    <div className="bg-gray-100">
      <Navbar />
      {paths.HOME != home && (
        <div
          onClick={() => {
            navigate(-1);
          }}
          className=" w-max flex items-center cursor-pointer hover:text-red-600 ease-out duration-300 p-4"
        >
          <img className="w-10  ml-6 inline" src={back} /> <span className="font-bold">Back</span>
        </div>
      )}

      <div className="bg-gray-100">
        {props.children}
        <Footer />
      </div>
    </div>
  );
}
