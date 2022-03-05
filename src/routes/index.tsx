import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { paths } from '../utils/constants';

//pages
import ErrorPage from '../pages/error/ErrorPage';
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Signin from '../pages/signin/Signin';
import SignUp from '../pages/signup/Signup';
import Selling from '../pages/selling/Selling';
import Upcoming from '../pages/upcoming/Upcoming';
import EventDetails from '../pages/eventdetails/EventDetails';
import ComingSoon from '../pages/comingsoon/ComingSoon';
import Profile from '../pages/profile/Profile';
import CreateEvent from '../pages/createEvent/CreateEvent';
import EventPreview from '../pages/eventpreview/EventPreview';
import ProtectedRoutes from './ProtectedRoutes';
import Events from '../pages/events/events';
import EditEvent from '../pages/editEvent/EditEvent';
import EditTicket from '../pages/editTicket/EditTicket';
import SigninAdmin from '../pages/admin/signinadmin/SigninAdmin';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import AdminUsers from '../pages/admin/users/Users';
import AdminEvents from '../pages/admin/events/Events';
import ForgotPassword from '../pages/forgotpassword/ForgotPassword';

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={paths.COMING} element={<ComingSoon />} />
          <Route path={paths.HOME} element={<Home />} />
          <Route path={paths.ABOUT} element={<About />} />
          <Route path={paths.SIGNIN} element={<Signin />} />
          <Route path={paths.SIGNUP} element={<SignUp />} />
          <Route path={paths.SELLING} element={<Selling />} />
          <Route path={paths.EVENTS} element={<Events />} />
          <Route path={paths.UPCOMING} element={<Upcoming />} />
          <Route path={paths.ADMIN} element={<SigninAdmin />} />
          <Route path={paths.DASHBOARD} element={<Dashboard />} />
          <Route path={paths.ADMIN_EVENTS} element={<AdminEvents />} />
          <Route path={paths.ADMIN_USERS} element={<AdminUsers />} />
          <Route path={paths.PREVIEW_EVENT} element={<EventPreview />} />
          <Route path={paths.FORGOT_PASSWORD} element={<ForgotPassword />} />

          <Route element={<ProtectedRoutes />}>
            <Route path={paths.PROFILE} element={<Profile />} />
            <Route path={paths.CREATE_EVENT} element={<CreateEvent />} />
            <Route path={paths.EVENT_DETAIL} element={<EventDetails />} />
            {/* <Route path={paths.ADD_TICKET} element={<CreateTicket />} /> */}
            <Route path={paths.EVENT_EDIT} element={<EditEvent />} />
            {/* <Route path={paths.TICKET_EDIT} element={<EditTicket />} /> */}
          </Route>

          <Route path={paths.ERROR} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
