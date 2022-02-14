import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { paths } from '../utils/constants';

//pages
import ErrorPage from '../pages/error/ErrorPage';
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Auth from '../middleware/storage';
import Signin from '../pages/signin/Signin';
import SignUp from '../pages/signup/Signup';
import Selling from '../pages/selling/Selling';
import Upcoming from '../pages/upcoming/Upcoming';
import EventDetails from '../pages/eventdetails/EventDetails';

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={paths.HOME} element={<Home />} />
          <Route path={paths.SIGNIN} element={<Signin />} />
          <Route path={paths.SIGNUP} element={<SignUp />} />
          <Route path={paths.SELLING} element={<Selling />} />
          <Route path={paths.UPCOMING} element={<Upcoming />} />
          <Route path={paths.EVENT_DETAIL} element={<EventDetails />} />
          <Route
            path={paths.ABOUT}
            element={!Auth.isAuthenticated() ? <About /> : <Navigate to={paths.ERROR} />}
          />
          <Route path={paths.ERROR} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
