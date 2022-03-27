import React from 'react';
import { Footer } from '../shared/Footer';
import { Navbar } from '../shared/Navbars';
// import { paths } from '../../utils/constants';

export default function MainLayout(props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) {
  // const home = window.location.pathname;
  // console.log(home, paths.HOME);
  return (
    <div className="bg-gray-100 ">
      <Navbar />
      <div className="bg-gray-100 overflow-x-auto">
        {props.children}
        <Footer />
      </div>
    </div>
  );
}
