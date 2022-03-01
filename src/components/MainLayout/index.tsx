import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getIsLoading } from '../../redux/reducers/loaderSlice';
import { Footer } from '../shared/Footer';
import { Loader } from '../shared/Loader';
import { Navbar } from '../shared/Navbars';
export default function MainLayout(props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) {
  const isLoading = useSelector(getIsLoading);
  return (
    <div className="bg-white">
      <ToastContainer />
      <Navbar />
      <div className="bg-gray-100">
        {props.children}
        <Footer />
      </div>
      {isLoading && <Loader size={50} />}
    </div>
  );
}
