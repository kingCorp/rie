import React from 'react';
import eve from '../../assets/img/eve1.png';
import eve4 from '../../assets/img/eve4.png';
import TicketEvent from '../../components/TicketEvent';
const events = [
  {
    title: 'Freshers Night',
    href: '#',
    date: ' Wed 19 Nov 2022',
    price: 20000,
    img: eve4,
  },
  {
    title: 'Cruiser Night',
    href: '#',
    date: ' Thur 1 Dec 2022',
    price: 10000,
    img: eve,
  },
];

const Tickets = () => {
  return (
    <section className="mt-6 mb-6">
      {(events || []).map((show, index) => {
        return (
          <TicketEvent
            // title={show.title}
            // img={show.img}
            // date={show.date}
            // price={show.price}
            key={index}
            // href={show.href}
            // booked
          />
        );
      })}
    </section>
  );
};

export default Tickets;
