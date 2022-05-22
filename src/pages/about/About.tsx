import React from 'react';
import MainLayout from '../../components/MainLayout';
const About = () => {
  return (
    <MainLayout>
      <div className="m-3 my-8">
        <p className="text-3xl font-bold text-center">ABOUT</p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          RIE Ticket is an online ticketing platform with the sole aim of providing ticketing
          services to our clients on different range of events that can ensure maximum satisfaction
          and a hassle-free process of event marketing and attendance. RIE Ticket is based in
          Nigeria and offers the expertise that a proactive-oriented and market-opportunity seeking
          company needs to develop and enter the entertainment space creating. We intend to provide
          a number of ticketing services to the entertainment community and to the public through
          the internet. These can be summed up in concert ticketing, E-sport and gaming ticketing,
          parties, seminars and conferences etc.
        </p>
        <p className="mt-2 font-bold max-w-2xl text-xl text-gray-800 lg:mx-auto">
          Benefits of using RIE ticket for your event
        </p>
        <ul className="mt-2 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          <li>
            <p className="mt-2">
              Total control over your event - Transparency in ticket management.
            </p>
          </li>
          <li>
            <p className="mt-2">Removes the stress of handling large amount of tickets.</p>{' '}
          </li>
          <li>
            <p className="mt-2">Saves cost on the printing and distribution of tickets.</p>{' '}
          </li>
          <li>
            <p className="mt-2">
              It will give you access to the total amount of people that has gotten ticket for your
              event.
            </p>
          </li>
          <li>
            <p className="mt-2">
              It provides a complete data base of the people that are attending your event.{' '}
            </p>
          </li>
          <li>
            <p className="mt-2">
              10% commission fee on tickets sold, however for free events it’s totally free.
            </p>
          </li>
        </ul>
      </div>
    </MainLayout>
  );
};

export default About;
