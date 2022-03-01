import React, { useEffect, useState } from 'react';
import CardEvent from '../../components/CardEvent';
import { NavlinkDefault } from '../../components/shared/Common';
import { useAppThunkDispatch } from '../../redux/store';
import { paths } from '../../utils/constants';
import { getMyEvents } from '../../redux/actions/events';
import { useAppSelector } from '../../redux/store';
import moment from 'moment';

interface EventProps {
  commission_percentage: number;
  created_at: string;
  description: string;
  end_date: string | Date;
  end_time: string;
  image: string;
  is_cashed_out: boolean;
  is_closed: boolean;
  is_security_requested: boolean;
  is_tag_requested: boolean;
  number_of_tickets_sold: number;
  organizer: string;
  start_date: string | Date;
  start_time: string;
  tickets: [];
  title: string;
  total_amount_sold: number;
  updated_at: string;
  venue: string;
  _id: string;
}

const MyEvent = () => {
  const { myEvents } = useAppSelector((state) => state.events);
  const [eventsData, setEventsData] = useState([] as Array<EventProps>);

  useEffect(() => {
    setEventsData(myEvents as Array<EventProps>);
  }, [myEvents]);

  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    const anony = async () => {
      return (await dispatch(getMyEvents({}))) as unknown;
    };
    anony()
      .then((ress) => {
        console.log(ress);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <section className="bg-gray-100 p-1 lg:px-10 lg:py-10">
      <section className="mt-6 mb-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
        {(eventsData || []).map((show, index) => {
          return (
            <CardEvent
              title={show.title}
              img={show.image}
              date={moment(show.start_date as Date).format('MMMM Do YYYY')}
              price={0}
              key={index}
              href={`/event/${show._id}`}
            />
          );
        })}
      </section>
      <div className="w-full flex justify-center pt-10">
        <NavlinkDefault path={paths.CREATE_EVENT} name="Register an Event" />
      </div>
    </section>
  );
};

export default MyEvent;
