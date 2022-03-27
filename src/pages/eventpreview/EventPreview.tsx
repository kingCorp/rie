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
  const [openForm, setOpenForm] = useState(false);

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
    if (cartItem.quantity > 0) {
      setCart((cart) => [...cart, cartItem]);
      handleClose();
    } else {
      toast.warn('Quantity cannot be 0');
    }
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

  const [signUpDetails, setSignUpDetails] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpDetails({
      ...signUpDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submits');
    e.preventDefault();
    if (signUpDetails.email === '' || signUpDetails.password === '') {
      toast('Kindly fill all fields');
      return;
    }

    await dispatch(signUpUser({ data: signUpDetails, userType: 'yes' }))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          toast.success(payload.message);
          setTicketsList(eventData.tickets);
          window.location.reload;
        } else {
          toast.error(payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                            className="bg-white shadow-lg p-3 rounded-2xl mt-3 md:flex justify-around items-center"
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

                            <div
                              className="cursor-pointer px-4 "
                              onClick={() => {
                                handleOpen(ticket._id, ticket.title, ticket.price);
                                handleCartItem(ticket.title, ticket.price, ticket._id);
                              }}
                            >
                              <img src={cartimg} alt="pendit" className="w-5" />
                            </div>
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
                        close
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
                            setCartItem({
                              ...cartItem,
                              quantity: Number(e.target.value),
                              total: cartItem.price * Number(e.target.value),
                            });
                          }}
                        />
                        <ButtonAction type="submit" name="Add to cart" />
                      </form>
                    </div>
                  </Modal>
                </div>
              </div>
              <div className="lg:col-span-4 w-full h-96 p-5">
                <div className="rounded-xl h-full overflow-hidden">
                  <img src={eventData.image} alt="gaming" className="w-full h-full object-cover " />
                </div>
              </div>
            </div>

            <div className="bg-white w-11/12 md:w-1/3 m-auto p-5 rounded-xl mt-40 font-rubik text-center space-y-4 mb-7">
              <p className="font-bold text-xl">Cart</p>
              {(cart || []).map((cartitem, key) => {
                return (
                  <div
                    className="flex bg-gray-100 p-3 rounded-xl shadow-lg justify-evenly relative"
                    key={key}
                  >
                    <p className="font-bold uppercase">{cartitem.title}</p>
                    <p>{cartitem.quantity}</p>
                    <p>₦{cartitem.price}</p>
                    <p>₦{cartitem.total}</p>
                    <div
                      className="absolute top-0 right-0 cursor-pointer"
                      onClick={() => {
                        deleteCartItem(cartitem.index);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
              <p className="font-bold">Total: ₦{cartTotal}</p>
              {Auth.isAuthenticated() ? (
                Auth.getRole() == 'user' ? (
                  cart.length === 0 ? (
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
                    path={paths.SIGNUP}
                    currentPath={'/preview/' + id}
                  />
                </div>
              )}
            </div>

            <Modal
              open={openForm}
              onClose={() => setOpenForm(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="bg-white w-4/5 md:w-1/3 m-auto p-5 rounded-xl mt-40 font-rubik text-center space-y-4">
                <button onClick={handleClose} className="flex justify-right">
                  close
                </button>
                <p className="uppercase font-bold text-xl">
                  We need this info help purchase your ticket
                </p>
                <form onSubmit={handleSubmit}>
                  <InputField
                    name="fullname"
                    label="Full name"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  />
                  <InputField
                    name="email"
                    label="Email-Address"
                    type="email"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  />
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  />
                  <InputField
                    name="phone"
                    label="Phone"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  />
                  <ButtonAction type="submit" name="Sign up" />
                </form>
              </div>
            </Modal>
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
