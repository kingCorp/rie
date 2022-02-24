import React from 'react';
import eve from '../../assets/img/eve1.png';
import eve2 from '../../assets/img/eve2.png';
import eve3 from '../../assets/img/eve3.png';
import eve4 from '../../assets/img/eve4.png';
import CardEvent from '../../components/CardEvent';
import { Navbar } from '../../components/shared/Navbars';
import { Footer } from '../../components/shared/Footer';
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

const Upcoming = () => {
  return (
    <div>
      <Navbar />
      <section className="bg-white p-1 lg:px-10 lg:py-10">
        <h2 className="text-4xl font-extrabold py-10" id="#selling">
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
      </section>
      <Footer />
    </div>
  );
};

export default Upcoming;
