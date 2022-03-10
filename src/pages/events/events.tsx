import React, { useEffect } from 'react';
import CardEvent from '../../components/CardEvent';
// import { Footer } from '../../components/shared/Footer';
// import { Navbar } from '../../components/shared/Navbars';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import { useState } from 'react';
import moment from 'moment';
import { getEvents } from '../../redux/actions/events';
import { Loader } from '../../components/shared/Common';
import MainLayout from '../../components/MainLayout';

interface EventProps {
  commission_percentage: number;
  created_at: string;
  description: string;
  end_date: string | Date;
  end_time: string;
  image: string;
  is_cashed_out: boolean;
  is_closed: boolean;
  is_live: boolean;
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

const Events = () => {
  const [eventsData, setEventsData] = useState([] as Array<EventProps>);

  const { events } = useAppSelector((state) => state.events);
  const { isLoading } = useAppSelector((state) => state.loader);
  useEffect(() => {
    setEventsData(events);
  }, [events]);

  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    const anony = async () => {
      return (await dispatch(getEvents({}))) as unknown;
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

  const isEventEmpty = eventsData.filter((event) => event.is_live === true);

  return (
    <div>
      <MainLayout>
        <section className="bg-white p-1 lg:px-10 lg:py-10">
          <h2 className="text-4xl font-extrabold py-10" id="#selling">
            Events
          </h2>
          {isLoading ? (
            <Loader />
          ) : (
            <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
              {(eventsData || [])
                .filter((event) => event.is_live === true)
                .map((show, index) => {
                  return (
                    <CardEvent
                      title={show.title}
                      img={show.image}
                      date={moment(show.start_date as Date).format('MMMM Do YYYY')}
                      price={0}
                      key={index}
                      href={`/preview/${show._id}`}
                    />
                  );
                })}
            </section>
          )}
          {!isLoading && isEventEmpty.length < 1 && <h1 className="text-center">No live event</h1>}
        </section>
      </MainLayout>
    </div>
  );
};

export default Events;
