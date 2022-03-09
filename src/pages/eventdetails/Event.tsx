import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import { useState, useEffect } from 'react';
import { getEvent, getTickets, goLiveEvent } from '../../redux/actions/events';
import penedit from '../../assets/img/penedit.svg';
import { ButtonAction, Loader } from '../../components/shared/Common';
import moment from 'moment';
import { Link } from 'react-router-dom';
import CreateTicket from '../createTicket/CreateTicket';
import EditTicket from '../editTicket/EditTicket';

interface EventProps {
  commission_percentage: number;
  created_at: string;
  description: string;
  end_date: string | Date;
  end_time: string;
  image: string;
  is_cashed_out: boolean;
  is_closed: boolean;
  is_live: boolean;
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
  _id: string;
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
const Event = () => {
  const { id } = useParams();
  const { event, tickets, ticketsLoading } = useAppSelector((state) => state.events);
  const { isLoading } = useAppSelector((state) => state.loader);
  const [eventData, setEventData] = useState({} as EventProps);
  const [ticketsList, setTicketsList] = useState([] as Array<Ticket>);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  useEffect(() => {
    setEventData(event as EventProps);
  }, [event]);

  useEffect(() => {
    setTicketsList(tickets);
  }, [tickets]);

  useEffect(() => {
    const anony = async () => {
      return (await dispatch(getTickets(id as string))) as unknown;
    };
    anony()
      .then((ress) => {
        console.log(ress);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, []);

  const goLive = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    const data = {
      show_id: eventData._id,
      is_live: e.target.checked,
    };
    await dispatch(goLiveEvent(data));
    await dispatch(getEvent(id as string));
  };

  return (
    <div>
      <CreateTicket handleClose={handleClose} showId={eventData._id} open={open} />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-gray-100">
          <div className="lg:grid  lg:grid-cols-12 gap-x-10 px-10 md:px-20  pt-10">
            <div className=" lg:col-span-8 w-full font-rubik py-5">
              <div className="px-3 flex flex-col md:flex-row md:items-center">
                <h2 className="font-bold text-2xl mr-8">{eventData.title}</h2>
                <span className=" mr-8">
                  {moment(eventData.start_date as Date).format('MMMM Do YYYY')}
                </span>
                <span className=" mr-8">
                  {moment(moment(eventData.start_time, [moment.ISO_8601, 'HH:mm'])).format('LT')}
                </span>
                <span className="">{eventData.venue}</span>
              </div>

              <div className="mt-4">
                <div className="relative">
                  <div
                    onChange={(e) => console.log(e.target)}
                    id="editEvent"
                    className="w-full h-max border-none rounded-xl focus:outline-none bg-white shadow-lg p-3 pr-8"
                  >
                    {eventData.description}
                  </div>
                  <Link to={`/event/edit/${eventData._id}`}>
                    <div className="w-max absolute cursor-pointer right-3 bottom-3">
                      <img src={penedit} alt="edittog" className="w-5" />
                    </div>
                  </Link>
                </div>

                <h3 className="mt-4 font-bold px-3">Go Live {eventData.is_live}</h3>
                <label
                  htmlFor="toggle-example-checked"
                  className="flex relative items-center mb-4 cursor-pointer"
                >
                  {eventData.is_live && (
                    <input
                      type="checkbox"
                      id="toggle-example-checked"
                      className="sr-only text-xs"
                      checked
                    />
                  )}
                  {!eventData.is_live && (
                    <input
                      type="checkbox"
                      id="toggle-example-checked"
                      className="sr-only text-xs"
                      onChange={(e) => goLive(e)}
                    />
                  )}
                  <div className="w-11 h-6 bg-gray-200 rounded-full text-xs border border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-600"></div>
                </label>

                <h3 className="mt-4 font-bold px-3">Tickets</h3>
                <div>
                  {ticketsLoading ? (
                    <Loader />
                  ) : (
                    (ticketsList || []).map((ticket, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-white shadow-lg p-3 rounded-2xl mt-3 md:flex  items-center"
                        >
                          <div>
                            <span className="font-bold uppercase mr-6 inline ">{ticket.title}</span>
                          </div>
                          <div className=" text-center px-3">
                            <span className=" text-xs text-gray-500">Price</span>
                            <p>N{ticket.price}</p>
                          </div>

                          <div className="text-center px-3">
                            <span className=" text-xs text-gray-500">Sold</span>
                            <p>{ticket.total_amount_purchased}</p>
                          </div>
                          <div className=" text-center px-3">
                            <span className=" text-xs text-gray-500">Ticket Limit</span>
                            <p>{ticket.capacity}</p>
                          </div>
                          <div className=" text-center px-3">
                            <span className=" text-xs text-gray-500">Sale Ends</span>
                            <p>{moment(eventData.end_date as Date).format('MMMM Do YYYY')}</p>
                          </div>
                          <div className=" text-center px-3">
                            <span className=" text-xs text-gray-500">Event Time</span>
                            <p>
                              {moment(
                                moment(eventData.start_time, [moment.ISO_8601, 'HH:mm']),
                              ).format('LT')}
                            </p>
                          </div>
                          <EditTicket
                            handleClose={handleCloseEdit}
                            open={openEdit}
                            ticket={ticket}
                          />

                          <div
                            className="cursor-pointer px-4 "
                            onClick={() => {
                              handleOpenEdit();
                            }}
                          >
                            <img src={penedit} alt="pendit" className="w-5" />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div
                className="rounded-3xl w-max px-3 py-2 cursor-pointer bg-gray-200 mt-4 text-gray-800 transform hover:scale-105 hover:bg-opacity-50 transition ease-out duration-300"
                onClick={() => {
                  handleOpen();
                }}
              >
                Add Ticket
              </div>
            </div>
            <div className="lg:col-span-4 w-full p-5 h-96">
              <div className="rounded-xl max-h-full min-h-full overflow-hidden">
                <img
                  src={eventData.image}
                  alt="gaming"
                  className="w-full max-h-full min-h-full object-cover "
                />
              </div>
            </div>
          </div>
          <div className="w-full px-20 py-5 flex justify-end">
            <Link to={`/event/edit/${eventData._id}`}>
              <ButtonAction name="Edit Event" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
