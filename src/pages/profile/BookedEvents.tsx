import moment from 'moment';
import React from 'react';
import CardEvent from '../../components/CardEvent';
import { EventProps } from '../home/Home';
const events: EventProps[] = [];

const BookedEvent = () => {
  return (
    <section className="bg-gray-100 p-1 lg:px-10 lg:py-10">
      <section className="mt-6 mb-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
        {(events || []).map((show, index) => {
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
      {events.length < 1 && <h1 className="text-center ">No Booked Events</h1>}
    </section>
  );
};

export default BookedEvent;
