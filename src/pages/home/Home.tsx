import React from 'react';
/* This example requires Tailwind CSS v2.0+ */
import phoneIcon from '../../assets/img/phone.png';
import eve from '../../assets/img/eve1.png';
import eve2 from '../../assets/img/eve2.png';
import eve3 from '../../assets/img/eve3.png';
import eve4 from '../../assets/img/eve4.png';
import { Navbar } from '../../components/shared/Navbars';
import { Footer } from '../../components/shared/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import CardEvent from '../../components/CardEvent';
import { paths } from '../../utils/constants';

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
];

export default function Home() {
  return (
    <div className="relative bg-white">
      <Navbar />
      {/* landind info */}
      <div className="relative bg-white overflow-hidden h-4/5">
        <div className="max-w-1xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:pl-40 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <p className="lg:text-2xl font-bold lg:text-gray-800 sm:mt-5 sm:text-lg sm:font-bold">
                  seamles access to
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
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <a
                    href={paths.SIGNIN}
                    className="flex w-40 justify-center py-2  text-base font-medium rounded-full text-white bg-red-600 hover:bg-gray-700"
                  >
                    Sign in
                  </a>
                </div>
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
      <section className="bg-gray-900 p-5 lg:px-20 lg:py-20">
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
            href="#"
            className="flex w-40 justify-center py-2  text-base font-medium border rounded-full text-white border-white hover:bg-red-700"
          >
            see more
          </a>
        </div>
      </section>

      {/* PAGE INFO WITH CARDS UPCOMING  */}
      <section className="bg-white p-5 lg:px-20 lg:py-20">
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
            href="#"
            className="flex w-40 justify-center py-2  text-base font-medium border rounded-full bg-gray-800 text-white hover:bg-red-700"
          >
            see more
          </a>
        </div>
      </section>

      {/* page util info */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-1xl mx-auto"></div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"></div>
      </div>
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-1xl mx-auto"></div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"></div>
      </div>
      <Footer />
    </div>
  );
}
