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
  const [filterEvent, setFilterEvents] = useState([] as Array<EventProps>);

  const { events } = useAppSelector((state) => state.events);
  const { isLoading } = useAppSelector((state) => state.loader);
  useEffect(() => {
    setEventsData(events);
    setFilterEvents(events);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const searchableEvents = filterEvent.filter((event) => event.is_live === true);
    const newEvent = searchableEvents.filter(
      (events) =>
        events.title.toLowerCase().includes(value.toLowerCase()) && events.is_live === true,
    );
    setEventsData(newEvent);
  };

  const isEventEmpty = eventsData.filter((event) => event.is_live === true);

  return (
    <div>
      <MainLayout>
        <section className="bg-white p-1 lg:px-10 lg:py-10">
          <h2 className="text-4xl font-extrabold py-10" id="#selling">
            Events
          </h2>

          <div className="w-max mx-auto py-3 font-rubik font-bold uppercase text-lg">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search events"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
              />
            </div>
          </div>

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
