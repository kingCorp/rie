import React from 'react';
import { Footer } from '../shared/Footer';
import { Navbar } from '../shared/Navbars';

export default function MainLayout(props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="bg-gray-100 overflow-x-auto">{props.children}</div>
      <Footer />
    </div>
  );
}
