/* eslint-disable */
import React from 'react';
import { useParams } from 'react-router-dom';
import { ButtonAction, InputField, Loader, NavlinkDefault } from '../../components/shared/Common';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import { getEvent, getTickets, submitTicketPayment } from '../../redux/actions/events';
import cartimg from '../../assets/img/cart.svg';
import moment from 'moment';
import MainLayout from '../../components/MainLayout';
import Back from '../../components/shared/Back/Back';
import Paystack from '../../components/Paystack/Paystack';
import Auth from '../../middleware/storage';
import { Modal } from '@mui/material';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import { signUpUser } from '../../redux/actions/auth';
import { paths } from '../../utils/constants';

type PayLoad = {
  status: boolean;
  message: string;
};

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
  tickets: Array<Ticket>;
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

interface CartItem {
  id: string;
  index: string;
  title: string;
  price: number;
  quantity: number;
  total: number;
}
interface PaymentTicketData {
  _id: string;
  quantity: number;
}
const EventPreview = () => {
  const { id } = useParams();
  const { event, ticketsLoading } = useAppSelector((state) => state.events);
  const { isLoading } = useAppSelector((state) => state.loader);
  const [eventData, setEventData] = useState({} as EventProps);
  const [ticketsList, setTicketsList] = useState([] as Array<Ticket>);
  const user = Auth.getUser();

  // Cart
  const [open, setOpen] = useState({ status: false, id: '', title: '', price: 0 });
  const handleOpen = (id: string, title: string, price: number) =>
    setOpen({ status: true, id, title, price });
  const handleClose = () => setOpen({ ...open, status: false });

  const [cartTotal, setCartTotal] = useState(0);
  const [cartItem, setCartItem] = useState({} as CartItem);
  const [cart, setCart] = useState([] as Array<CartItem>);

  const [reference, setReference] = useState('');

  const handleCartItem = (title: string, price: number, id: string) => {
    const index = v4();
    setCartItem({
      id,
      index,
      title,
      price,
      quantity: 0,
      total: 0,
    });
  };

  const deleteCartItem = (index: string) => {
    setCart(cart.filter((item) => item.index !== index));
  };

  const handleCartSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();
    // if (cartItem.quantity > 0) {
    //   setCart((cart) => [...cart, cartItem]);
    //   handleClose();
    // } else {
    //   toast.warn('Quantity cannot be 0');
    // }
  };

  useEffect(() => {
    var total = 0;
    cart.forEach((item) => {
      total += item.total;
    });
    setCartTotal(total);
  }, [cart]);

  useEffect(() => {
    if (reference !== '') {
      const verifyPayment = async (reference: string) => {
        const cartTicketList = [] as Array<PaymentTicketData>;
        cart.forEach((item) => {
          cartTicketList.push({
            _id: item.id,
            quantity: item.quantity,
          });
        });
        const paymentDetails = {
          show_id: eventData._id,
          payment_reference: reference,
          tickets: cartTicketList,
        };
        console.log(paymentDetails);
        return await dispatch(submitTicketPayment(paymentDetails));
      };
      verifyPayment(reference).then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          console.log('success', payload);
          toast.success(payload.message);
        } else {
          console.log('error', payload);
          toast.error(payload.message);
        }
      });
    }
  }, [reference]);

  useEffect(() => {
    setTicketsList(eventData.tickets);
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

  console.log(cart, cartTotal);
  return (
    <>
      <MainLayout>
        <Back />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="bg-gray-100">
            <div className="lg:grid  lg:grid-cols-12 gap-x-10 px-5 md:px-20  pt-5">
            <div className="lg:col-span-4 w-full h-90 lg:hidden md:hidden">
                <div className="rounded-xl h-full overflow-hidden">
                  <img src={eventData.image} alt="gaming" className="w-full h-full object-cover " />
                </div>
              </div>
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
                            className="bg-white shadow-lg p-3 rounded-2xl mt-3 md:flex justify-around items-center"
                          >
                            <div>
                              <span className="font-bold uppercase mr-6 inline ">
                                {ticket.title}
                              </span>
                            </div>
                            <div className=" text-center px-3">
                              <span className=" text-xs text-gray-500">Price</span>
                              <p>₦{ticket.price}</p>
                            </div>
                            {/* 
                            <div className="text-center px-3">
                              <span className=" text-xs text-gray-500">Sold</span>
                              <p>{ticket.total_amount_purchased}</p>
                            </div>
                            <div className=" text-center px-3">
                              <span className=" text-xs text-gray-500">Ticket Limit</span>
                              <p>{ticket.capacity}</p>
                            </div> */}
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
                            {ticket.capacity <= ticket.purchased ? (
                              <p className="text-center font-bold text-red-500">SOLD OUT</p>
                            ) : (
                              <div className="flex justify-center">
                                <button
                                  onClick={() => {
                                    handleOpen(ticket._id, ticket.title, ticket.price);
                                    handleCartItem(ticket.title, ticket.price, ticket._id);
                                  }}
                                  className="cursor-pointer font-bold bg-red-600 text-white rounded-2xl p-2 "
                                >
                                  Buy
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                  <Modal
                    open={open.status}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <div className="bg-white w-4/5 md:w-1/3 m-auto p-5 rounded-xl mt-40 font-rubik text-center space-y-4">
                      <button onClick={handleClose} className="flex justify-right">
                        X
                      </button>
                      <p className="uppercase font-bold text-xl"> {open.title}</p>
                      <p className="uppercase font-bold text-lg"> N{open.price}</p>
                      <form onSubmit={handleCartSubmit}>
                        <InputField
                          name="quantity"
                          label="Quantity"
                          type="number"
                          // value={cartItem.quantity}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            console.log(cartItem);
                            // setCartItem({
                            //   ...cartItem,
                            //   quantity: Number(e.target.value),
                            //   total: cartItem.price * Number(e.target.value),
                            // });
                            // setCart((cart) => [...cart, cartItem]);
                            setCart([
                              {
                                ...cartItem,
                                quantity: Number(e.target.value),
                                total: cartItem.price * Number(e.target.value),
                              },
                            ]);
                          }}
                        />
                        <div className="flex justify-center">
                          {/* <ButtonAction type="submit" name="Buy" /> */}
                          {Auth.isAuthenticated() ? (
                            Auth.getRole() == 'user' ? (
                              cart.length === 0 || cart[0].quantity < 1 ? (
                                <Paystack
                                  email={user.email}
                                  name={user.fullname}
                                  phone={user.phone}
                                  amount={cartTotal}
                                  setReference={setReference}
                                  disabled
                                />
                              ) : (
                                <Paystack
                                  email={user.email}
                                  name={user.fullname}
                                  phone={user.phone}
                                  amount={cartTotal}
                                  setReference={setReference}
                                />
                              )
                            ) : (
                              'Only a user can make payment'
                            )
                          ) : (
                            <div className="grid place-content-center">
                              <NavlinkDefault
                                name="Buy ticket"
                                path={paths.SIGNIN}
                                currentPath={'/preview/' + id}
                              />
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                  </Modal>
                </div>
              </div>
              <div className="lg:col-span-4 w-full h-96 lg:block md:block hidden mb-20">
                <div className="rounded-xl h-full overflow-hidden">
                  <img src={eventData.image} alt="gaming" className="w-full h-full object-cover " />
                </div>
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default EventPreview;
