import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/shared/Common';
import TicketEvent from '../../components/TicketEvent';
import { getUserTickets } from '../../redux/actions/events';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';

interface Ticket {
  is_checked_in: boolean;
  _id: string;
  code: string;
  ticket: {
    price: number;
    total_amount_purchased: number;
    capacity: number;
    purchased: number;
    codes: [];
    _id: string;
    show: {
      commission_percentage: 0;
      number_of_tickets_sold: 0;
      total_amount_sold: 16800;
      is_live: boolean;
      is_closed: boolean;
      is_cashed_out: boolean;
      is_security_requested: boolean;
      is_tag_requested: boolean;

      _id: string;
      organizer: string;
      title: string;
      description: string;
      venue: string;
      image: string;
      start_time: string;
      end_time: string;
      start_date: string;
      end_date: string;
      created_at: string;
      updated_at: string;
    };
    title: string;
    created_at: string;
    updated_at: string;
  };
  user: string;
  payment_ref: string;
  created_at: string;
  updated_at: string;
}

const Tickets = () => {
  const dispatch = useAppThunkDispatch();
  const { userTickets } = useAppSelector((state) => state.events);
  const { isLoading } = useAppSelector((state) => state.loader);
  const [codes, setCodes] = useState([] as Array<Ticket>);
  const [ticket, setTicket] = useState({} as Ticket);
  const [view, setView] = useState(false);
  useEffect(() => {
    setCodes(userTickets);
  }, [userTickets]);

  useEffect(() => {
    (async () => {
      return await dispatch(getUserTickets({}));
    })()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <section className="mt-6 mb-6">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {view && (
            <TicketEvent
              ticket_title={ticket.ticket?.title}
              show_title={ticket.ticket?.show?.title}
              start_date={moment(ticket.ticket?.show.start_date).format('MMMM Do')}
              start_time={moment(
                moment(ticket.ticket?.show.start_time, [moment.ISO_8601, 'HH:mm']),
              ).format('LT')}
              price={ticket.ticket?.price}
              href={' '}
              booked={ticket?.is_checked_in}
              image={ticket.ticket?.show.image}
              capacity={ticket.ticket?.capacity}
              code={ticket?.code}
            />
          )}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  codes.length > 0 &&
                  codes.map((code, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >
                          {code.code}
                        </th>
                        <td className="px-6 py-4">{code.ticket?.show?.title}</td>
                        <td className="px-6 py-4">{code.ticket?.title}</td>
                        <td className="px-6 py-4">
                          {moment(code.ticket?.show.start_date).format('MMMM Do')}
                        </td>
                        <td className="px-6 py-4">
                          {moment(
                            moment(code.ticket?.show.start_time, [moment.ISO_8601, 'HH:mm']),
                          ).format('LT')}
                        </td>
                        <td className="px-6 py-4">{code.ticket?.purchased}</td>
                        <td className="px-6 py-4">{code.ticket?.total_amount_purchased}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => {
                              setTicket(code);
                              setView(true);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Tickets;
