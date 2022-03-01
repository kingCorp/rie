import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import { useState, useEffect } from 'react';
import { getEvent } from '../../redux/actions/events';
import gaming from '../../assets/img/gaming.png';
import penedit from '../../assets/img/penedit.svg';
import canceledit from '../../assets/img/canceledit.svg';
import { ButtonAction } from '../../components/shared/Common';
import moment from 'moment';

interface EventProps {
  commission_percentage: number;
  created_at: string;
  description: string;
  end_date: string | Date;
  end_time: string;
  image: string;
  is_cashed_out: boolean;
  is_closed: boolean;
  is_security_requested: boolean;
  is_tag_requested: boolean;
  number_of_tickets_sold: number;
  organizer: string;
  start_date: string | Date;
  start_time: string;
  tickets: [];
  title: string;
  total_amount_sold: number;
  updated_at: string;
  venue: string;
}

interface Ticket {
  price: number;
  total_amount_purchased: number;
  capacity: number;
  purchased: number;
  codes: [];
  _id: string;
  show: string;
  title: string;
  created_at: string;
  updated_at: string;
}
const EventDetails = () => {
  const { id } = useParams();
  const [editable, setEditable] = useState(false);
  const { event } = useAppSelector((state) => state.events);
  const [eventData, setEventData] = useState({} as EventProps);
  const [tickets, setTickets] = useState([] as Array<Ticket>);

  useEffect(() => {
    setEventData(event as EventProps);
  }, [event]);

  useEffect(() => {
    setTickets(eventData.tickets);
  }, [eventData]);

  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    const anony = async () => {
      return (await dispatch(getEvent(id as string))) as unknown;
    };
    anony()
      .then((ress) => {
        console.log(ress);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // const tickets = [
  //   {
  //     title: 'fortnite',
  //     price: 5000,
  //     total_amount_purchased: 18,
  //     capacity: 22,
  //     endDate: '2022-01-15',
  //   },
  //   {
  //     title: 'fortnite',
  //     price: 5000,
  //     total_amount_purchased: 18,
  //     capacity: 22,
  //     endDate: '2022-01-15',
  //   },
  //   {
  //     title: 'fortnite',
  //     price: 5000,
  //     total_amount_purchased: 18,
  //     capacity: 22,
  //     endDate: '2022-01-15',
  //   },
  //   {
  //     title: 'fortnite',
  //     price: 5000,
  //     total_amount_purchased: 18,
  //     capacity: 22,
  //     endDate: '2022-01-15',
  //   },
  // ];

  return (
    <div>
      <MainLayout>
        <div className="bg-gray-100">
          <div className="lg:grid  lg:grid-cols-12 gap-x-10 px-20  pt-10">
            <div className=" lg:col-span-7 w-full font-rubik py-5">
              <div className="px-3">
                <h2 className="font-bold text-2xl inline mr-8">{eventData.title}</h2>
                <span className="inline">
                  {moment(eventData.start_date as Date).format('MMMM Do YYYY')}
                </span>
              </div>
              <div className="mt-4">
                <div className="relative">
                  <div
                    onChange={(e) => console.log(e.target)}
                    id="editEvent"
                    contentEditable={editable}
                    className="w-full h-max border-none rounded-xl focus:outline-none bg-white shadow-lg p-3 pr-8"
                  >
                    {eventData.description}
                  </div>
                  <div
                    onClick={() => {
                      setEditable(!editable);
                    }}
                    className="w-max absolute cursor-pointer right-3 bottom-3"
                  >
                    <img src={editable ? canceledit : penedit} alt="edittog" className="w-5" />
                  </div>
                </div>

                <h3 className="mt-4 font-bold px-3">Tickets</h3>
                <div>
                  {(tickets || []).map((ticket, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-white shadow-lg p-3 rounded-2xl mt-3 md:flex  items-center"
                      >
                        <div>
                          <span className="font-bold uppercase mr-6 inline ">{ticket.title}</span>
                        </div>
                        <div className=" text-center px-5">
                          <span className=" text-xs text-gray-500">Price</span>
                          <p>N{ticket.price}</p>
                        </div>

                        <div className="text-center px-5">
                          <span className=" text-xs text-gray-500">Sold</span>
                          <p>{ticket.total_amount_purchased}</p>
                        </div>
                        <div className=" text-center px-5">
                          <span className=" text-xs text-gray-500">Ticket Limit</span>
                          <p>{ticket.capacity}</p>
                        </div>
                        <div className=" text-center px-5">
                          <span className=" text-xs text-gray-500">Sale Ends</span>
                          <p>{moment(eventData.end_date as Date).format('MMMM Do YYYY')}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl w-max px-3 py-2 cursor-pointer bg-gray-200 mt-4 text-gray-700">
                Add Ticket
              </div>
            </div>
            <div className="lg:col-span-5 w-full p-5">
              <div className="rounded-xl overflow-hidden">
                <img src={eventData.image} alt="gaming" className="w-full object-cover " />
              </div>
            </div>
          </div>
          <div className="w-full px-20 py-5 flex justify-end">
            <ButtonAction name="Save Changes" />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default EventDetails;
