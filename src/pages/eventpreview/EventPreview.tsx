/* eslint-disable */
import React from 'react';
import { useParams } from 'react-router-dom';
import { ButtonAction, InputField, Loader } from '../../components/shared/Common';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import { getEvent, getTickets } from '../../redux/actions/events';
import cartimg from '../../assets/img/cart.svg';
import moment from 'moment';
import MainLayout from '../../components/MainLayout';
import Back from '../../components/shared/Back/Back';
import Paystack from '../../components/Paystack/Paystack';
import Auth from '../../middleware/storage';
import { Modal } from '@mui/material';

interface EventProps {
  commission_percentage: number;
  created_at: string;
  description: string;
  end_date: string;
  end_time: string;
  image: string;
  is_cashed_out: boolean;
  is_closed: boolean;
  is_security_requested: boolean;
  is_tag_requested: boolean;
  number_of_tickets_sold: number;
  organizer: string;
  start_date: string;
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

interface CartItem {
  title: string;
  price: number;
  quantity: number;
  total: number;
}
const EventPreview = () => {
  const { id } = useParams();
  const { event, tickets, ticketsLoading } = useAppSelector((state) => state.events);
  const { isLoading } = useAppSelector((state) => state.loader);
  const [eventData, setEventData] = useState({} as EventProps);
  const [ticketsList, setTicketsList] = useState([] as Array<Ticket>);
  const user = Auth.getUser();

  const [purchase, setPurchase] = useState({
    show_id: '',
    payment_reference: '',
    tickets: [
      {
        _id: '6217588266cc0e0023114198',
        quantity: 4,
      },
    ],
  });

  // Cart
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [cartTotal, setCartTotal] = useState(0);
  const [cartItem, setCartItem] = useState({} as CartItem);
  const [cart, setCart] = useState([] as Array<CartItem>);

  const handleCartItem = (e: React.ChangeEvent<HTMLInputElement>, title: string, price: number) => {
    const quantity = Number(e.target.value);
    setCartItem({
      title,
      price,
      quantity: quantity,
      total: price * quantity,
    });
  };

  const handleCartSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCart((cart) => [...cart, cartItem]);
    handleClose();
  };

  useEffect(() => {
    var total = 0;
    cart.forEach((item) => {
      total += item.total;
    });
    setCartTotal(total);
  }, [cart]);

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
  }, [eventData]);

  useEffect(() => {
    setEventData(event as EventProps);
  }, [event]);

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

  return (
    <>
      <MainLayout>
        <Back />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="bg-gray-100">
            <div className="lg:grid  lg:grid-cols-12 gap-x-10 px-10 md:px-20  pt-10">
              <div className=" lg:col-span-8 w-full font-rubik py-5">
                <div className="px-3 flex flex-col md:flex-row md:items-center">
                  <h2 className="font-bold text-2xl mr-8">{eventData.title}</h2>
                  <span className=" mr-8">
                    {moment(eventData.start_date).format('MMMM Do YYYY')}
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
                  </div>

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
                              <span className="font-bold uppercase mr-6 inline ">
                                {ticket.title}
                              </span>
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
                              <p>{moment(eventData.end_date).format('MMMM Do YYYY')}</p>
                            </div>
                            <div className=" text-center px-3">
                              <span className=" text-xs text-gray-500">Event Time</span>
                              <p>
                                {moment(
                                  moment(eventData.start_time, [moment.ISO_8601, 'HH:mm']),
                                ).format('LT')}
                              </p>
                            </div>

                            <div
                              className="cursor-pointer px-4 "
                              onClick={() => {
                                handleOpen();
                              }}
                            >
                              <img src={cartimg} alt="pendit" className="w-5" />
                            </div>

                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <div className="bg-white w-4/5 md:w-1/3 m-auto p-5 rounded-xl mt-40 font-rubik text-center space-y-4">
                                <p className="uppercase font-bold text-xl"> {ticket.title}</p>
                                <p className="uppercase font-bold text-lg"> N{ticket.price}</p>
                                <form onSubmit={handleCartSubmit}>
                                  <InputField
                                    name="quantity"
                                    label="Quantity"
                                    type="number"
                                    value={cartItem.quantity}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                      handleCartItem(e, ticket.title, ticket.price);
                                    }}
                                  />
                                  <ButtonAction type="submit" name="Add to cart" />
                                </form>
                              </div>
                            </Modal>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 w-full h-96 p-5">
                <div className="rounded-xl h-full overflow-hidden">
                  <img src={eventData.image} alt="gaming" className="w-full h-full object-cover " />
                </div>
              </div>
            </div>

            <div className="bg-white w-4/5 md:w-1/3 m-auto p-5 rounded-xl mt-40 font-rubik text-center space-y-4">
              <p>Cart</p>
              {(cart || []).map((cartitem, key) => {
                return (
                  <div className="flex justify-around" key={key}>
                    <p>{cartitem.title}</p>
                    <p>{cartitem.price}</p>
                    <p>{cartitem.quantity}</p>
                    <p>{cartitem.total}</p>
                  </div>
                );
              })}
              <p>Total: N{cartTotal}</p>
            </div>
            {Auth.isAuthenticated() ? (
              cart.length === 0 ? (
                <Paystack
                  email={user.email}
                  name={user.fullname}
                  phone={user.phone}
                  amount={cartTotal}
                  disabled
                />
              ) : (
                <Paystack
                  email={user.email}
                  name={user.fullname}
                  phone={user.phone}
                  amount={cartTotal}
                />
              )
            ) : (
              'You have to be signed in to make payment'
            )}
          </div>
        )}
      </MainLayout>
      {/* <div className="bg-black bg-opacity-80">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className=" w-max flex items-center cursor-pointer text-white  hover:text-red-600 ease-out duration-300 p-4"
        >
          <img className="w-10  ml-6 inline" src={back} /> <span className="font-bold">Back</span>
        </div>

        <div className="flex justify-center py-60   font-rubik">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-col md:flex-row w-3/4 justify-center bg-white rounded-xl overflow-hidden">
              <div>
                <img src={eventData.image} className="w-full h-full object-cover" />
              </div>
              <div className=" w-full border-2 border-white bg-white relative p-4">
                <h1 className="font-bold text-4xl mb-2">{eventData.title}</h1>
                <p className=" font-bold mb-2">
                  {moment(eventData.start_date).format('MMMM Do YYYY')}
                </p>
                <p className=" font-bold mb-2">
                  {moment(moment(eventData.start_time, [moment.ISO_8601, 'HH:mm'])).format('LT')}
                </p>
                <p className=" font-bold mb-2">{eventData.venue}</p>
                <p>{eventData.description}</p>
                <div className="bottom-5 right-5  md:absolute justify-center mt-16">
                  <div className="m-auto md:flex md:flex-col  w-max text-center">
                    <p className="font-bold text-3xl">N15,000</p>
                    <ButtonAction name="Buy Ticket" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div> */}
    </>
  );
};

export default EventPreview;
