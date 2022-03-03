import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../shared/Footer';
import { Navbar } from '../shared/Navbars';
import back from '../../assets/img/back.svg';

export default function MainLayout(props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div
        onClick={() => {
          navigate(-1);
        }}
        className=" w-max flex items-center cursor-pointer hover:text-red-600 ease-out duration-300 p-4"
      >
        <img className="w-10  ml-6 inline" src={back} /> <span className="font-bold">Back</span>
      </div>
      <div className="bg-gray-100">
        {props.children}
        <Footer />
      </div>
    </div>
  );
}
