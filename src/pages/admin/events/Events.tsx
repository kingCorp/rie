import { Modal } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { ButtonAction, InputField, Loader } from '../../../components/shared/Common';
import { getEvents } from '../../../redux/actions/events';
import { useAppSelector, useAppThunkDispatch } from '../../../redux/store';
import cancel from '../../../assets/img/canceledit.svg';
import {
  closeEvent,
  deleteEvent,
  setCommission,
  toggleCashOut,
} from '../../../redux/actions/admin';
import { toast } from 'react-toastify';
import CardEvent2 from '../../../components/CardEvent2';
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
  is_cash_out_requested: boolean;
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

type PayLoad = {
  status: boolean;
  message: string;
};
const AdminEvents = () => {
  const dispatch = useAppThunkDispatch();

  const { deleteEventLoading, closeEventLoading, commissionLoading, toggleCashOutLoading } =
    useAppSelector((state) => state.loader);
  const [eventsData, setEventsData] = useState([] as Array<EventProps>);
  const [commisionData, setCommissionData] = useState({
    show_id: '',
    commission_percentage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommissionData({
      ...commisionData,
      [name]: Number(value),
    });
  };

  const [open, setOpen] = useState({ status: false, showId: '' });
  const handleOpen = (showId: string) => {
    setOpen({ status: true, showId: showId });
    setCommissionData({
      show_id: showId,
      commission_percentage: '',
    });
  };
  const handleClose = () => setOpen({ status: false, showId: '' });

  const { events } = useAppSelector((state) => state.events);
  const { isLoading } = useAppSelector((state) => state.loader);
  useEffect(() => {
    setEventsData(events);
  }, [events]);

  const handleCloseEvent = async () => {
    await dispatch(closeEvent(open.showId))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          toast.success(payload.message);
        } else {
          console.log('error', payload);
          toast.error(payload.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    handleClose();
  };
  const handleDeleteEvent = async () => {
    await dispatch(deleteEvent(open.showId))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          toast.success(payload.message);
        } else {
          console.log('error', payload);
          toast.error(payload.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    handleClose();
  };

  const handleToggleCashOut = async (cashOutState: boolean) => {
    await dispatch(toggleCashOut({ show_id: open.showId, cash_out_state: cashOutState }))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          toast.success(payload.message);
        } else {
          console.log('error', payload);
          toast.error(payload.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    await dispatch(getEvents({}));
    handleClose();
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(setCommission(commisionData))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          toast.success(payload.message);
          setCommissionData({
            ...commisionData,
            commission_percentage: '',
          });
        } else {
          console.log('error', payload);
          toast.error(payload.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    handleClose();
  };

  useEffect(() => {
    const anony = async () => {
      return (await dispatch(getEvents({}))) as unknown;
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
    <AdminLayout>
      <p className="text-2xl font-bold mb-4 mt-4">Events</p>
      <section className="p-1 lg:p-4">
        {isLoading ? (
          <Loader />
        ) : (
          <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {(eventsData || []).map((show, index) => {
              return (
                <CardEvent2
                  title={show.title}
                  img={show.image}
                  date={moment(show.start_date as Date).format('MMMM Do YYYY')}
                  price={0}
                  key={index}
                  onClick={() => handleOpen(show._id)}
                  href={`/admin/event/${show._id}`}
                >
                  {show.is_cash_out_requested ? (
                    show.is_cashed_out ? (
                      <div className=" w-max bg-green-400 text-white rounded absolute top-2 right-2 p-1">
                        Cashout Approved
                      </div>
                    ) : (
                      <div className=" w-max bg-orange-400 text-white rounded absolute top-2 right-2 p-1">
                        Cashout Requested
                      </div>
                    )
                  ) : (
                    <div></div>
                  )}
                </CardEvent2>
              );
            })}
            <Modal
              open={open.status}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className=" w-11/12 md:w-2/4 lg:w-1/3 m-auto bg-gray-50 rounded-xl overflow-hidden mt-40 p-3">
                <div>
                  <button onClick={handleClose} className="m-4">
                    <img src={cancel} alt="cancel" className="w-6" />
                  </button>
                </div>
                <div className="text-center py-4 ">
                  <h2 className="font-bold font-rubik text-2xl">Event Actions</h2>
                </div>
                <div className=" flex flex-col items-center pt-6 sm:pt-0 homebg">
                  <div className="w-full sm:max-w-md p-5 mx-auto">
                    <div className=" space-y-8">
                      <div className="m-auto w-max">
                        {closeEventLoading ? (
                          <ButtonAction
                            name="Close Event"
                            onClick={() => handleCloseEvent()}
                            loading
                            disabled
                          />
                        ) : (
                          <ButtonAction name="Close Event" onClick={() => handleCloseEvent()} />
                        )}
                      </div>
                      <div className="m-auto w-max">
                        {toggleCashOutLoading ? (
                          <ButtonAction name="Approve Cashout" loading disabled />
                        ) : (
                          <ButtonAction
                            name="Approve Cashout"
                            onClick={() => handleToggleCashOut(true)}
                          />
                        )}
                      </div>
                      <div className="m-auto w-max">
                        {deleteEventLoading ? (
                          <ButtonAction
                            name="Delete Event"
                            onClick={() => handleDeleteEvent()}
                            loading
                            disabled
                          />
                        ) : (
                          <ButtonAction name="Delete Event" onClick={() => handleDeleteEvent()} />
                        )}
                      </div>

                      <div className="">
                        <p className="text-center font-rubik font-bold text-lg mb-5">
                          Set Commission Percentage
                        </p>
                        <form onSubmit={handleSubmit}>
                          <InputField
                            name="commission_percentage"
                            label="Commission Percentage"
                            type="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              handleChange(e);
                            }}
                          />
                          <div className="m-auto w-max">
                            {commissionLoading ? (
                              <ButtonAction name="Submit" disabled loading />
                            ) : (
                              <ButtonAction name="Submit" type="submit" />
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </section>
        )}
      </section>
    </AdminLayout>
  );
};

export default AdminEvents;
