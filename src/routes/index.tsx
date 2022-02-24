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
import ComingSoon from '../pages/comingsoon/ComingSoon';
import Profile from '../pages/profile/Profile';
import CreateEvent from '../pages/createEvent/CreateEvent';
import CreateTicket from '../pages/createTicket/CreateTicket';
import EventPreview from '../pages/eventpreview/EventPreview';
import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={paths.COMING} element={<ComingSoon />} />
          <Route path={paths.HOME} element={<Home />} />
          <Route path={paths.SIGNIN} element={<Signin />} />
          <Route path={paths.SIGNUP} element={<SignUp />} />
          <Route path={paths.SELLING} element={<Selling />} />
          <Route path={paths.UPCOMING} element={<Upcoming />} />
          <Route path={paths.EVENT_DETAIL} element={<EventDetails />} />

          <Route path={paths.CREATE_EVENT} element={<CreateEvent />} />
          <Route path={paths.ADD_TICKET} element={<CreateTicket />} />
          <Route path={paths.PREVIEW_EVENT} element={<EventPreview />} />
          <Route
            path={paths.ABOUT}
            element={!Auth.isAuthenticated() ? <About /> : <Navigate to={paths.ERROR} />}
          />

          <Route element={<ProtectedRoutes />}>
            <Route path={paths.PROFILE} element={<Profile />} />
          </Route>

          <Route path={paths.ERROR} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
