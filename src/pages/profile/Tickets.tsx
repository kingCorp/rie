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
        (codes || []).map((code, index) => {
          return (
            <TicketEvent
              ticket_title={code.ticket.title}
              show_title={code.ticket.show.title}
              start_date={moment(code.ticket.show.start_date).format('MMMM Do')}
              start_time={moment(
                moment(code.ticket.show.start_time, [moment.ISO_8601, 'HH:mm']),
              ).format('LT')}
              price={code.ticket.price}
              href={' '}
              booked={code.is_checked_in}
              image={code.ticket.show.image}
              capacity={code.ticket.capacity}
              key={index}
            />
          );
        })
      )}
    </section>
  );
};

export default Tickets;
