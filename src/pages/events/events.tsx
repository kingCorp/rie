import React, { useEffect } from 'react';
import eve from '../../assets/img/eve1.png';
import eve2 from '../../assets/img/eve2.png';
import eve3 from '../../assets/img/eve3.png';
import eve4 from '../../assets/img/eve4.png';
import CardEvent from '../../components/CardEvent';
import { Footer } from '../../components/shared/Footer';
import { Navbar } from '../../components/shared/Navbars';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import { useState } from 'react';
import moment from 'moment';
import { getEvents } from '../../redux/actions/events';

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
}
// const events = [
//   {
//     title: 'Freshers Night',
//     href: '#',
//     date: ' Wed 19 Nov 2022',
//     price: 20000,
//     img: eve4,
//   },
//   {
//     title: 'Cruiser Night',
//     href: '#',
//     date: ' Thur 1 Dec 2022',
//     price: 10000,
//     img: eve,
//   },
//   {
//     title: 'Awards',
//     href: '#',
//     date: ' Sun 12 July 2022',
//     price: 3000,
//     img: eve2,
//   },
//   {
//     title: 'Beach Show',
//     href: '#',
//     date: ' Sat 2 Aug 2022',
//     price: 5000,
//     img: eve3,
//   },
//   {
//     title: 'Freshers Night',
//     href: '#',
//     date: ' Wed 19 Nov 2022',
//     price: 20000,
//     img: eve4,
//   },
//   {
//     title: 'Cruiser Night',
//     href: '#',
//     date: ' Thur 1 Dec 2022',
//     price: 10000,
//     img: eve,
//   },
//   {
//     title: 'Awards',
//     href: '#',
//     date: ' Sun 12 July 2022',
//     price: 3000,
//     img: eve2,
//   },
//   {
//     title: 'Beach Show',
//     href: '#',
//     date: ' Sat 2 Aug 2022',
//     price: 5000,
//     img: eve3,
//   },
//   {
//     title: 'Cruiser Night',
//     href: '#',
//     date: ' Thur 1 Dec 2022',
//     price: 10000,
//     img: eve,
//   },
//   {
//     title: 'Awards',
//     href: '#',
//     date: ' Sun 12 July 2022',
//     price: 3000,
//     img: eve2,
//   },
//   {
//     title: 'Beach Show',
//     href: '#',
//     date: ' Sat 2 Aug 2022',
//     price: 5000,
//     img: eve3,
//   },
// ];

const Events = () => {
  const [eventsData, setEventsData] = useState([] as Array<EventProps>);

  const { events } = useAppSelector((state) => state.events);
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
  }, []);
  return (
    <div>
      <Navbar />
      <section className="bg-white p-1 lg:px-10 lg:py-10">
        <h2 className="text-4xl font-extrabold py-10" id="#selling">
          Events
        </h2>
        <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {(eventsData || []).map((show, index) => {
            return (
              <CardEvent
                title={show.title}
                img={show.image}
                date={moment(show.start_date as Date).format('MMMM Do YYYY')}
                price={0}
                key={index}
                href={`/preview/${index}`}
              />
            );
          })}
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default Events;
