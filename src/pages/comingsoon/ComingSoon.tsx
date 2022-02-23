import React from 'react';

import Preloader from '../../components/Preloader/Preloader';
import Timer from '../../components/Countdown/Timer';
// import Optin from '../../components/Optin/Optin';

import './style.css';
const ComingSoon = () => {
  return (
    <div className="bodysoon">
      <div className="App">
        <div className="container">
          <h1>
            RIETICKET
            <br />
            Coming Soon
          </h1>
          <Timer />
          {/* <Optin /> */}
          <Preloader />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
