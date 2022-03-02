import React from 'react';

// type Props = {
//   title?: string;
//   date?: string;
//   price?: number;
//   href?: string;
//   booked?: boolean;
// };

export default function TicketEvent() {
  return (
    <div className="p-4 w-full mb-2 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-8">
        <div className="text-center">
          <h3 className="mb-2 text-6xl font-bold text-gray-900 dark:text-white">23</h3>
          <h3 className="mb-2 text-lg font-bold text-gray-500 dark:text-white">March</h3>
        </div>
        <div>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Music Event</p>
          <h3 className="mb-2 text-3xl font-bold text-gray-500 dark:text-white">Cruise n Vibes</h3>
          <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">Monday 15th 2016</p>
          <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
            15:20Pm &amp; 11:00Am
          </p>
          <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
            North,Soth, United State , Amre Party Number 16,20
          </p>
        </div>
      </div>
    </div>
  );
}
