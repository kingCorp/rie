import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import Back from '../../components/shared/Back/Back';
import { TabButtonAction } from '../../components/shared/Common';
import Event from './Event';
import EventSubscribers from './EventSubscribers';
import ScanTicket from './ScanTicket';

const EventDetails = () => {
  const [active, setActive] = useState('event');

  const makeActive = (tab: string) => {
    setActive(tab);
  };

  return (
    <div>
      <MainLayout>
        <Back />
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
          <li className="w-full flex justify-center">
            <TabButtonAction
              onClick={() => makeActive('scan')}
              name="Scan"
              active={active === 'scan' ? true : false}
            />
          </li>
        </ul>

        {active == 'event' && (
          <div className="lg:px-8 py-4 sm:px-1 flex justify-center">
            <Event />
          </div>
        )}
        {active == 'sub' && (
          <div className="py-4 px-1">
            <EventSubscribers />
          </div>
        )}
        {active == 'scan' && (
          <div className="lg:px-8 py-4 sm:px-1 flex justify-center">
            <ScanTicket />
          </div>
        )}
      </MainLayout>
    </div>
  );
};

export default EventDetails;
