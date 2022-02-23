import React from 'react';
import eve from '../../assets/img/eve1.png';
import eve2 from '../../assets/img/eve2.png';
import eve3 from '../../assets/img/eve3.png';
import eve4 from '../../assets/img/eve4.png';
import CardEvent from '../../components/CardEvent';
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
  {
    title: 'Awards',
    href: '#',
    date: ' Sun 12 July 2022',
    price: 3000,
    img: eve2,
  },
  {
    title: 'Beach Show',
    href: '#',
    date: ' Sat 2 Aug 2022',
    price: 5000,
    img: eve3,
  },
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
  {
    title: 'Awards',
    href: '#',
    date: ' Sun 12 July 2022',
    price: 3000,
    img: eve2,
  },
  {
    title: 'Beach Show',
    href: '#',
    date: ' Sat 2 Aug 2022',
    price: 5000,
    img: eve3,
  },
  {
    title: 'Cruiser Night',
    href: '#',
    date: ' Thur 1 Dec 2022',
    price: 10000,
    img: eve,
  },
  {
    title: 'Awards',
    href: '#',
    date: ' Sun 12 July 2022',
    price: 3000,
    img: eve2,
  },
  {
    title: 'Beach Show',
    href: '#',
    date: ' Sat 2 Aug 2022',
    price: 5000,
    img: eve3,
  },
];

const BookedEvent = () => {
  return (
    <section className="bg-white p-1 lg:px-10 lg:py-10">
      <section className="mt-6 mb-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
        {(events || []).map((show, index) => {
          return (
            <CardEvent
              title={show.title}
              img={show.img}
              date={show.date}
              price={show.price}
              key={index}
              href={show.href}
              booked
            />
          );
        })}
      </section>
      {/* <div className="w-full flex justify-center pt-10">
        <NavlinkDefault path="#" name="Register an Event" />
      </div> */}
    </section>
  );
};

export default BookedEvent;
