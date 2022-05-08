/* eslint-disable */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppThunkDispatch } from '../../../redux/store';
import { useState, useEffect } from 'react';
import { getEvent, getTickets, goLiveEvent, requestCashOut } from '../../../redux/actions/events';
import penedit from '../../../assets/img/penedit.svg';
import { ButtonAction, ButtonSpinner, Loader } from '../../../components/shared/Common';
import moment from 'moment';
import { Link } from 'react-router-dom';
import CreateTicket from '../../createTicket/CreateTicket';
import EditTicket from '../../editTicket/EditTicket';
import { toast } from 'react-toastify';
import { Modal } from '@mui/material';
import cancel from '../../../assets/img/canceledit.svg';
import { Account } from '../../profile/ProfileInfo';
import Api from '../../../services/apis';
import { PAYSTACK_PUBLIC_KEY } from '../../../utils/constants';
import axios from 'axios';

type PayLoad = {
  status: boolean;
  message: string;
};
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
  organizer: {
    fullname?: string;
    phone?: string;
    email?: string;
  };
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
const AdminEvent = () => {
  const { id } = useParams();
  const { event, tickets, ticketsLoading } = useAppSelector((state) => state.events);
  const { isLoading, cashOutLoading } = useAppSelector((state) => state.loader);
  const [eventData, setEventData] = useState({} as EventProps);
  const [ticketsList, setTicketsList] = useState([] as Array<Ticket>);
  const [accounts, setAccounts] = useState([] as Array<Account>);
  const [banks, setBanks] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openCashout, setOpenCashout] = useState(false);
  const handleOpenCashout = () => setOpenCashout(true);
  const handleCloseCashout = () => setOpenCashout(false);

  const [openEdit, setOpenEdit] = useState({ state: false, ticketId: '' });
  const handleOpenEdit = (ticketId: string) => setOpenEdit({ state: true, ticketId: ticketId });
  const handleCloseEdit = () => setOpenEdit({ state: false, ticketId: '' });

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

  useEffect(() => {
    userInfo();
    fetchBanks();
    // eslint-disable-next-line
  }, []);

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
  const checkCashDate = new Date().getTime() > new Date(eventData.end_date).getTime();
  const handleCashOut = async () => {
    await dispatch(requestCashOut({ show_id: eventData._id }))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          handleCloseCashout();
          return toast.success(payload.message);
        } else {
          handleCloseCashout();
          return toast.warn(payload.message);
        }
      })
      .catch((err) => {
        handleCloseCashout();
        console.error(err);
      });
  };

  const userInfo = async () => {
    try {
      const res = await Api.user.organizerDetails();
      setAccounts(res.data.data.accountInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBanks = async () => {
    try {
      const res = await axios.get('https://api.paystack.co/bank', {
        headers: { Authorization: 'Bearer ' + PAYSTACK_PUBLIC_KEY },
      });
      setBanks(res.data.data);
    } catch (error) {
      console.log(error);
    }
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
              <div className="py-2">
                <p className="text-lg mb-2">Title :</p>
                <p className="font-bold text-2xl">{eventData.title}</p>
              </div>
              <div className="py-2">
                <p className="text-lg mb-2">Date :</p>
                <p className="font-bold text-2xl">
                  {' '}
                  {moment(eventData.start_date as Date).format('MMMM Do YYYY')}
                </p>
              </div>
              <div className="py-2">
                <p className="text-lg mb-2">Time :</p>
                <p className="font-bold text-2xl">
                  {moment(moment(eventData.start_time, [moment.ISO_8601, 'HH:mm'])).format('LT')}
                </p>
              </div>
              <div className="py-2">
                <p className="text-lg mb-2">Venue :</p>
                <p className="font-bold text-2xl">{eventData.venue}</p>
              </div>
              <div className="py-2">
                <p className="text-lg mb-2">Description :</p>
                <p className="font-bold text-lg">{eventData.description}</p>
              </div>
              <div className="py-2">
                <p className="text-lg mb-2">Status :</p>
                {eventData.is_live ? (
                  <p className="text-green-500 font-bold text-lg">Active</p>
                ) : (
                  <p className="text-orange-500 font-bold text-lg">Pending</p>
                )}
                {eventData.is_closed && <p className="text-red-500 font-bold text-lg">Closed</p>}
              </div>
              <div className="py-2">
                <p className="text-lg mb-2">Tickets sold: </p>
                <p className="font-bold text-lg">{eventData.number_of_tickets_sold}</p>
              </div>
              <div className="py-2">
                <p className="text-lg mb-2">Organizer: </p>
                <p className="text-lg font-bold">{eventData.organizer?.fullname}</p>
                <p className="text-lg font-bold">{eventData.organizer?.phone}</p>
                <p className="text-lg font-bold">{eventData.organizer?.email}</p>
              </div>

              <div className="mt-4">
                <h3 className="mt-4 font-bold px-3">Tickets</h3>
                <div>
                  {ticketsLoading ? (
                    <Loader />
                  ) : (
                    (eventData.tickets || []).map((ticket: Ticket, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-white shadow-lg p-3 rounded-2xl mt-3 md:flex justify-around items-center"
                        >
                          <div>
                            <span className="font-bold uppercase mr-6 inline ">{ticket.title}</span>
                          </div>
                          <div className=" text-center px-3">
                            <span className=" text-xs text-gray-500">Price</span>
                            <p>₦{ticket.price}</p>
                          </div>

                          <div className="text-center px-3">
                            <span className=" text-xs text-gray-500">Sold</span>
                            <p>{ticket.purchased}</p>
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
                        </div>
                      );
                    })
                  )}
                </div>
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
          {/* <div className="w-full px-20 py-5 flex justify-end">
            <Link to={`/event/edit/${eventData._id}`}>
              <ButtonAction name="Edit Event" />
            </Link>
          </div> */}
        </div>
      )}
      <Modal
        open={openCashout}
        onClose={handleCloseCashout}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="w-11/12 md:w-2/4 lg:w-1/3 m-auto bg-gray-50 rounded-xl overflow-hidden mt-40">
          <div>
            <button onClick={handleCloseCashout} className="m-4">
              <img src={cancel} alt="cancel" className="w-6" />
            </button>
          </div>
          <div className="text-center py-4 ">
            <h2 className="font-bold font-rubik text-2xl">Cashout Information</h2>
          </div>
          <div className=" flex flex-col items-center pt-6 sm:pt-0 homebg">
            <div className="w-full sm:max-w-md p-5 mx-auto">
              <p>Title: {eventData.title}</p>
              <p>Total Amount Sold: N{eventData.total_amount_sold}</p>
              <p>Total Ticket Sold: {eventData.number_of_tickets_sold}</p>
              <p>Commission: {eventData.commission_percentage}%</p>
              <br />
              <p className="font-bold">Organizer account details</p>
              <br />
              <div>
                {accounts?.map((account: Account, key) => (
                  <div key={key}>
                    <div>
                      {banks.map((bank: { name: string; code: string }, i) => {
                        if (bank.code == account.bank_name) {
                          return <p>Bank: {bank.name}</p>;
                        }
                        return;
                      })}
                      <p>Account Name: {account.name}</p>
                      <p>Account Number: {account.number}</p>
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <button
                className=" text-white font-rubik px-4 py-2 bg-red-600 rounded-full hover:bg-gray-400"
                type="button"
                onClick={() => handleCashOut()}
              >
                {cashOutLoading ? <ButtonSpinner /> : 'Request Cash Out'}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminEvent;
