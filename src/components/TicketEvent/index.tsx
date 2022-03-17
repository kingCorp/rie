import React from 'react';
import QRCode from 'qrcode.react';
import './index.css';

type Props = {
  ticket_title?: string;
  show_title?: string;
  start_date?: string;
  start_time?: string;
  price?: number;
  href?: string;
  booked?: boolean;
  image?: string;
  capacity?: number;
  code?: string;
};

export default function TicketEvent(props: Props) {
  const ticketback = props.image;
  return (
    <div className="w-full">
      <div
        className="rounded-2xl h-40 w-5/6 md:w-3/4 lg:w-3/5 m-auto mb-10 relative uppercase overflow-hidden font-rubik pl-8 py-4 text-white bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${ticketback as string})` }}
      >
        <div className="h-4 w-8 bg-gray-100 absolute top-0 right-1/4 rounded-b-full"></div>
        <div className="h-4 w-8 bg-gray-100 absolute bottom-0 right-1/4 rounded-t-full"></div>

        <div>
          <p className="font-bold text-xl">{props.show_title}</p>
          <p className="font-bold text-xs">Live session</p>
          <p>
            {props.start_date} <span className="ml-3">{props.start_time}</span>{' '}
          </p>
          <span className="flex pt-4">
            <div>
              <p className="tiny-text">Entrance</p>
              <div className="rounded h-6 w-14 bg-slate-700"></div>
            </div>
            <div className="ml-6">
              <p className="tiny-text">Seat</p>
              <div className="rounded h-6 w-10  bg-slate-700"></div>
            </div>
          </span>
        </div>
        <div className="design-box h-full absolute right-0 top-0">
          <div className="relative w-full h-full">
            <QRCode
              id={props.code}
              value={props.code || ''}
              size={50}
              level={'H'}
              includeMargin={true}
            />
            <div className=" absolute hidden md:block right-0 top-0 text-center rotate-box pt-3 mr-2">
              <div>
                <p className="font-bold text-lg">{props.ticket_title}</p>
                <p className="font-bold text-xs">Live session</p>
                <p className="text-xs">
                  {props.start_date} <span className="ml-3">{props.start_time}</span>{' '}
                </p>

                <span className="flex pt-4 justify-around">
                  <div>
                    <p className="tiny-text">Entrance</p>
                    <div className="rounded h-6 w-14 bg-slate-700"></div>
                  </div>
                  <div className="ml-6">
                    <p className="tiny-text">Seat</p>
                    <div className="rounded h-6 w-10  bg-slate-700"></div>
                  </div>
                </span>
                <p className="text-xs font-bold py-2"> Admit five</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="p-4 w-full mb-2 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
//   <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-8">
//     <div className="text-center">
//       <h3 className="mb-2 text-6xl font-bold text-gray-900 dark:text-white">23</h3>
//       <h3 className="mb-2 text-lg font-bold text-gray-500 dark:text-white">March</h3>
//     </div>
//     <div>
//       <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Music Event</p>
//       <h3 className="mb-2 text-3xl font-bold text-gray-500 dark:text-white">Cruise n Vibes</h3>
//       <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">Monday 15th 2016</p>
//       <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
//         15:20Pm &amp; 11:00Am
//       </p>
//       <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
//         North,Soth, United State , Amre Party Number 16,20
//       </p>
//     </div>
//   </div>
// </div>
