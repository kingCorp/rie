import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { TabButtonAction } from '../../components/shared/Common';
import BookedEvent from './BookedEvents';
import MyEvent from './MyEvents';
import Tickets from './Tickets';
import { useLocation } from 'react-router-dom';
interface LocationState {
  from: string;
}
const Profile = () => {
  const location = useLocation();
  const { from } = (location.state as LocationState) || { from: 'myevent' };

  const [active, setActive] = useState('myevent');

  const makeActive = (tab: string) => {
    setActive(tab);
  };

  useEffect(() => {
    makeActive(from);
  }, [from]);
  return (
    <MainLayout>
      <ul className="pt-14 flex divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700">
        <li className="w-full flex justify-center">
          <TabButtonAction
            onClick={() => makeActive('myevent')}
            name="My Events"
            active={active === 'myevent' ? true : false}
          />
        </li>
        <li className="w-full flex justify-center">
          <TabButtonAction
            onClick={() => makeActive('ticket')}
            name="My Tickets"
            active={active === 'ticket' ? true : false}
          />
        </li>
        <li className="w-full flex justify-center">
          <TabButtonAction
            onClick={() => makeActive('booked')}
            name="Booked Events"
            active={active === 'booked' ? true : false}
          />
        </li>
        <li className="w-full flex justify-center">
          <TabButtonAction
            onClick={() => makeActive('timeline')}
            name="Timeline"
            active={active === 'timeline' ? true : false}
          />
        </li>
      </ul>
      {active == 'myevent' && (
        <div className="lg:px-8 py-4 sm:px-1 flex justify-center">
          <MyEvent />
        </div>
      )}
      {active == 'booked' && (
        <div className="lg:px-8 py-4 sm:px-1 flex justify-center">
          <BookedEvent />
        </div>
      )}
      {active == 'ticket' && (
        <div className="lg:px-8 py-4 sm:px-1 flex justify-center">
          <Tickets />
        </div>
      )}
      {active == 'timeline' && (
        <div className="lg:px-8 py-4 sm:px-1 flex justify-center">
          <MyEvent />
        </div>
      )}
    </MainLayout>
  );
};

export default Profile;
