import React, { useEffect, useState } from 'react';
/* This example requires Tailwind CSS v2.0+ */
import phoneIcon from '../../assets/img/phone.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import CardEvent from '../../components/CardEvent';
import { paths } from '../../utils/constants';
import MainLayout from '../../components/MainLayout';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import { getEvents } from '../../redux/actions/events';
import moment from 'moment';
import Auth from '../../middleware/storage';
import { Loader } from '../../components/shared/Common';
import Featured from '../../components/shared/Feature';

export interface EventProps {
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
  organizer: { email: string };
  start_date: string | Date;
  start_time: string;
  tickets: [];
  title: string;
  total_amount_sold: number;
  updated_at: string;
  venue: string;
  _id: string;
}

export default function Home() {
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
    <MainLayout>
      <div className="relative bg-white overflow-hidden head">
        <div className="max-w-1xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:pl-40 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <p className="lg:text-2xl font-bold lg:text-gray-800 sm:mt-5 sm:text-lg sm:font-bold">
                  seamless access to
                </p>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  all Experience
                </h1>
                <div className="mt-5">
                  <p className="font-bold">
                    <FontAwesomeIcon icon={faCheckCircle} size="1x" /> Book tickets
                  </p>
                  <p className="font-bold">
                    <FontAwesomeIcon icon={faCheckCircle} size="1x" /> Promote your events and sell
                    tickets
                  </p>
                </div>
                {!Auth.isAuthenticated() && (
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <a
                      href={paths.SIGNIN}
                      className="flex w-40 justify-center py-2  text-base font-medium rounded-full text-white bg-red-600 hover:bg-gray-700"
                    >
                      Sign in
                    </a>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-center sm:h-92 md:h-96 lg:w-full lg:h-full"
            src={phoneIcon}
            alt="homeicon"
          />
        </div>
      </div>

      {/* PAGE INFO WITH CARDS SELLING  */}
      {/* <section className="bg-gray-900 p-5 lg:px-20 lg:py-20">
        <h2 className="text-4xl font-extrabold text-white" id="#selling">
          Selling Hot!!!
        </h2>
        <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {(events || []).map((show, index) => {
            return (
              <CardEvent
                title={show.title}
                img={show.img}
                date={show.date}
                price={show.price}
                key={index}
                href={show.href}
              />
            );
          })}
        </section>
        <div className="w-full flex justify-center pt-10">
          <a
            href={paths.SELLING}
            className="flex w-40 justify-center py-2  text-base font-medium border rounded-full text-white border-white hover:bg-red-700"
          >
            see more
          </a>
        </div>
      </section> */}
      <section className="bg-gray-900 p-5 lg:px-20 lg:py-20">
        <h2 className="text-4xl font-extrabold text-white text-center" id="#events">
          Events
        </h2>

        {isLoading ? (
          <Loader />
        ) : (
          <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {(eventsData || [])
              .filter((event) => {
                const specialOrganizer = [];
                const checkCashDate = new Date().getTime() < new Date(event.end_date).getTime();
                if (event.organizer?.email === 'entertainmentmbi@gmail.com') {
                  specialOrganizer.push(event.organizer?.email);
                }
                return (
                  event.is_live === true &&
                  event.is_closed === false &&
                  checkCashDate &&
                  specialOrganizer.length > 0
                );
              })
              .slice(0, 1)
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

            {(eventsData || [])
              .filter((event) => {
                const checkCashDate = new Date().getTime() < new Date(event.end_date).getTime();
                return (
                  event.is_live === true &&
                  event.is_closed === false &&
                  checkCashDate &&
                  event.organizer?.email !== 'entertainmentmbi@gmail.com'
                );
              })
              .slice(0, 8)
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

        {!isLoading && isEventEmpty.length < 1 && (
          <h1 className="text-white text-center">No live event</h1>
        )}

        {!isLoading && isEventEmpty.length > 0 && (
          <div className="w-full flex justify-center pt-10">
            <Link
              to={paths.EVENTS}
              className="flex w-40 justify-center py-2  text-base font-medium border rounded-full text-white border-white hover:bg-red-700"
            >
              see more
            </Link>
          </div>
        )}
      </section>

      {/* PAGE INFO WITH CARDS UPCOMING  */}
      {/* <section className="bg-white p-5 lg:px-20 lg:py-20">
        <h2 className="text-4xl font-extrabold" id="#upcoming">
          Upcoming!!!
        </h2>
        <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {(events || []).map((show, index) => {
            return (
              <CardEvent
                title={show.title}
                img={show.img}
                date={show.date}
                price={show.price}
                key={index}
                href={show.href}
              />
            );
          })}
        </section>
        <div className="w-full flex justify-center pt-10">
          <a
            href={paths.UPCOMING}
            className="flex w-40 justify-center py-2  text-base font-medium border rounded-full bg-gray-800 text-white hover:bg-red-700"
          >
            see more
          </a>
        </div>
      </section> */}
      <Featured />
    </MainLayout>
  );
}
