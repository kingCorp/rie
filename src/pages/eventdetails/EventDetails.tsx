import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { TabButtonAction } from '../../components/shared/Common';
import Event from './Event';
import EventSubscribers from './EventSubscribers';

const EventDetails = () => {
  const [active, setActive] = useState('event');

  const makeActive = (tab: string) => {
    setActive(tab);
  };

  return (
    <div>
      <MainLayout>
        <ul className="pt-14 flex divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700">
          <li className="w-full flex justify-center">
            <TabButtonAction
              onClick={() => makeActive('event')}
              name="Event details"
              active={active === 'event' ? true : false}
            />
          </li>
          <li className="w-full flex justify-center">
            <TabButtonAction
              onClick={() => makeActive('sub')}
              name="Subscribers"
              active={active === 'sub' ? true : false}
            />
          </li>
        </ul>

        {active == 'event' && (
          <div className="lg:px-8 py-4 sm:px-1 flex justify-center">
            <Event />
          </div>
        )}
        {active == 'sub' && (
          <div className="lg:px-8 py-4 sm:px-1 flex justify-center">
            <EventSubscribers />
          </div>
        )}
      </MainLayout>
    </div>
  );
};

export default EventDetails;
