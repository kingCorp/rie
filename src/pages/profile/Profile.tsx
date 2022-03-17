import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { TabButtonAction } from '../../components/shared/Common';
import MyEvent from './MyEvents';
import Tickets from './Tickets';
import { useLocation } from 'react-router-dom';
import Auth from '../../middleware/storage';
import ProfileInfo from './ProfileInfo';

interface LocationState {
  from: string;
}

const Profile = () => {
  const location = useLocation();
  const { from } = (location.state as LocationState) || {
    from: Auth?.getRole() === 'organizer' ? 'myevent' : 'ticket',
  };

  //const { auth } = useAppSelector((state) => state);

  const [active, setActive] = useState(Auth?.getRole() === 'organizer' ? 'myevent' : 'ticket');

  const makeActive = (tab: string) => {
    setActive(tab);
  };

  useEffect(() => {
    makeActive(from);
  }, [from]);
  return (
    <MainLayout>
      <ul className="pt-14 flex divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700">
        {Auth?.getRole() === 'organizer' && (
          <li className="w-full flex justify-center">
            <TabButtonAction
              onClick={() => makeActive('myevent')}
              name="My Events"
              active={active === 'myevent' ? true : false}
            />
          </li>
        )}
        {Auth?.getRole() === 'user' && (
          <li className="w-full flex justify-center">
            <TabButtonAction
              onClick={() => makeActive('ticket')}
              name="My Tickets"
              active={active === 'ticket' ? true : false}
            />
          </li>
        )}
        <li className="w-full flex justify-center">
          <TabButtonAction
            onClick={() => makeActive('profile')}
            name="Profile Info"
            active={active === 'profile' ? true : false}
          />
        </li>
      </ul>
      {active == 'myevent' && (
        <div className="lg:px-8 py-4 sm:px-1 flex justify-center">
          <MyEvent />
        </div>
      )}
      {active == 'ticket' && Auth?.getRole() === 'user' && (
        <div className="">
          <Tickets />
        </div>
      )}
      {active == 'profile' && (
        <div className="lg:px-8 py-4 sm:px-1 flex justify-center">
          <ProfileInfo />
        </div>
      )}
    </MainLayout>
  );
};

export default Profile;
